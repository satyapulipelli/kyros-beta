import { 
  collection, 
  addDoc, 
  serverTimestamp,
  query,
  where,
  getDocs 
} from 'firebase/firestore';
import { db } from './config';

// Collection names
const WAITLIST_COLLECTION = 'waitlist';
const SURVEY_COLLECTION = 'survey_responses';

// Add email to waitlist - INSTANT VERSION
export const addToWaitlistFast = async (email) => {
  try {
    const docRef = await addDoc(collection(db, WAITLIST_COLLECTION), {
      email: email.toLowerCase(),
      timestamp: serverTimestamp(),
      status: 'pending',
      source: 'website'
    });
    
    // Send to Google Sheets in background
    sendToGoogleSheets({
      type: 'waitlist',
      email: email.toLowerCase(),
      status: 'pending',
      source: 'website'
    });
    
    return {
      success: true,
      id: docRef.id,
      message: 'Successfully added to waitlist!'
    };
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    return {
      success: false,
      message: 'Failed to add to waitlist. Please try again.'
    };
  }
};

// Add email to waitlist - WITH DUPLICATE CHECK (current version)
export const addToWaitlist = async (email) => {
  try {
    // Check if email already exists - with timeout
    const checkPromise = new Promise(async (resolve) => {
      const q = query(collection(db, WAITLIST_COLLECTION), where("email", "==", email.toLowerCase()));
      const querySnapshot = await getDocs(q);
      resolve(!querySnapshot.empty);
    });

    // Set a timeout of 2 seconds for the duplicate check
    const timeoutPromise = new Promise((resolve) => {
      setTimeout(() => resolve(false), 2000);
    });

    // Race between check and timeout
    const isDuplicate = await Promise.race([checkPromise, timeoutPromise]);
    
    if (isDuplicate) {
      return { 
        success: false, 
        message: 'You\'re already on the waitlist! We\'ll notify you when we launch.' 
      };
    }

    // Add new email
    const docRef = await addDoc(collection(db, WAITLIST_COLLECTION), {
      email: email.toLowerCase(),
      timestamp: serverTimestamp(),
      status: 'pending',
      source: 'website'
    });

    return { 
      success: true, 
      id: docRef.id,
      message: 'Successfully added to waitlist!' 
    };
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    // If error is network related, still try to succeed
    if (error.code === 'unavailable') {
      return { 
        success: true, 
        message: 'Added to waitlist!' 
      };
    }
    return { 
      success: false, 
      message: 'Failed to add to waitlist. Please try again.' 
    };
  }
};

// Add survey response
export const addSurveyResponse = async (surveyData) => {
  try {
    const docRef = await addDoc(collection(db, SURVEY_COLLECTION), {
      ...surveyData,
      timestamp: serverTimestamp(),
      completed: true
    });

    return { 
      success: true, 
      id: docRef.id,
      message: 'Survey completed successfully!' 
    };
  } catch (error) {
    console.error('Error saving survey:', error);
    return { 
      success: false, 
      message: 'Failed to save survey. Please try again.' 
    };
  }
};

// Combined function to save both email and survey
export const saveWaitlistWithSurvey = async (email, surveyData) => {
  try {
    const waitlistResult = await addToWaitlistFast(email);
    
    const surveyPayload = {
      email: email.toLowerCase(),
      waitlistId: waitlistResult.id || null,
      ...surveyData
    };
    
    const surveyResult = await addSurveyResponse(surveyPayload);
    
    // Send survey to Google Sheets
    sendToGoogleSheets({
      type: 'survey',
      ...surveyData,
      email: email.toLowerCase()
    });
    
    return {
      success: true,
      waitlistId: waitlistResult.id,
      surveyId: surveyResult.id,
      message: 'Successfully joined waitlist!'
    };
  } catch (error) {
    console.error('Error in saveWaitlistWithSurvey:', error);
    return {
      success: false,
      message: 'Something went wrong. Please try again.'
    };
  }
};

const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzO3K7kGFRZ3_DVWrezQsr0-5QcZQE5IWm6ax0wD88a2vjeZSCSxQTlXg3kbu0SLTHVEw/exec';

// Add this function to send data to Google Sheets
const sendToGoogleSheets = async (data) => {
  try {
    // Note: We use no-cors mode because Google Apps Script doesn't support CORS
    await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(data)
    });
    console.log('Sent to Google Sheets');
  } catch (error) {
    console.error('Error sending to sheets:', error);
    // Don't throw - this is a background operation
  }
};