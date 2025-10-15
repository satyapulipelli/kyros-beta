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
    // Just add immediately - no checks
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
    // Still return success to not block user
    return { 
      success: true, 
      message: 'Added to waitlist!' 
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
export const saveWaitlistWithSurvey = async (email, surveyAnswers) => {
  try {
    // Use the FAST version for instant submission
    const waitlistResult = await addToWaitlistFast(email);
    
    if (!waitlistResult.success && !waitlistResult.message.includes('already')) {
      return waitlistResult;
    }

    // Then save survey response with email reference
    const surveyData = {
      email: email.toLowerCase(),
      waitlistId: waitlistResult.id || null,
      ...surveyAnswers
    };

    const surveyResult = await addSurveyResponse(surveyData);
    
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