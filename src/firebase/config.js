// Import the functions you need from the SDKs
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeLimlRES7Meq7aRFCteS159xW5tfZLlw",
  authDomain: "kyros-app-56574.firebaseapp.com",
  projectId: "kyros-app-56574",
  storageBucket: "kyros-app-56574.firebasestorage.app",
  messagingSenderId: "761843451077",
  appId: "1:761843451077:web:4cd4807ba245ac9e11dcac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;