// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIm06_gpcGDuT1tC6ODD5PPvfy98G3Vh4",
  authDomain: "python-lms-401823.firebaseapp.com",
  projectId: "python-lms-401823",
  storageBucket: "python-lms-401823.appspot.com",
  messagingSenderId: "893030336396",
  appId: "1:893030336396:web:8753f388a90268de48f8a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db = getFirestore(app);

export default db;