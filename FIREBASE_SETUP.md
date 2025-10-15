# Firebase Setup Guide for KYROS

## 1. Install Firebase Dependencies

```bash
cd "/Users/satya/Desktop/Gym Pass Booking and Fitness Platform Concept/kyros-website"
npm install firebase
```

## 2. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create Project"
3. Name it "kyros-app" (or similar)
4. Disable Google Analytics (optional)
5. Create project

## 3. Add Web App to Firebase

1. In Firebase Console, click the web icon (</>)
2. Register app as "KYROS Web"
3. Copy your configuration

## 4. Enable Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create Database"
3. Choose "Start in production mode"
4. Select your location (asia-south1 for India)
5. Click "Enable"

## 5. Update Firebase Config

Replace the placeholder values in `src/firebase/config.js` with your actual config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "kyros-app.firebaseapp.com",
  projectId: "kyros-app",
  storageBucket: "kyros-app.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## 6. Set Firestore Security Rules

In Firebase Console > Firestore Database > Rules, add:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to waitlist for admin (you'll add authentication later)
    match /waitlist/{document} {
      allow read: if false; // No public read
      allow create: if true; // Anyone can join waitlist
      allow update, delete: if false; // No updates or deletes from client
    }
    
    // Allow write access to survey_responses
    match /survey_responses/{document} {
      allow read: if false; // No public read
      allow create: if true; // Anyone can submit survey
      allow update, delete: if false; // No updates or deletes from client
    }
  }
}
```

Click "Publish" to save the rules.

## 7. Test Your Setup

1. Run your app:
```bash
npm run dev
```

2. Try submitting an email in the hero section
3. Complete the survey
4. Check Firebase Console > Firestore Database to see the data

## 8. Firestore Data Structure

Your data will be stored as:

### `waitlist` collection:
```json
{
  "email": "user@example.com",
  "timestamp": "2024-01-01T12:00:00Z",
  "status": "pending",
  "source": "website"
}
```

### `survey_responses` collection:
```json
{
  "email": "user@example.com",
  "waitlistId": "abc123",
  "userType": "Business traveler",
  "features": "30% cheaper daily passes",
  "painPoint": "Paying for unused days",
  "priceRange": "₹200-250",
  "location": "Mumbai",
  "timestamp": "2024-01-01T12:00:00Z",
  "completed": true
}
```

## 9. Optional: Add Environment Variables

Create `.env.local` file:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

Then update `config.js` to use them:

```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

## 10. Troubleshooting

If you get errors:
- Make sure Firebase is installed: `npm install firebase`
- Check that Firestore is enabled in Firebase Console
- Verify your config values are correct
- Check browser console for specific error messages

## Next Steps

- Add Firebase Authentication for admin panel
- Create admin dashboard to view waitlist
- Add email notifications using Firebase Functions
- Export data to CSV for marketing