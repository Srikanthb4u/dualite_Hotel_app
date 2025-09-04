// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbFA0Tkeb8Wzh3Kxms0bxP_WDxfrl5OTo",
  authDomain: "inn-craft.firebaseapp.com",
  projectId: "inn-craft",
  storageBucket: "inn-craft.firebasestorage.app",
  messagingSenderId: "914444514349",
  appId: "1:914444514349:web:cfd7299f1c72e485e374a4",
  measurementId: "G-B795TJL6ND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
