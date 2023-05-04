// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyDIjJbcTssVletvfIa9vSSIz0zehQpigeQ",
  authDomain: "chat-app-d18c8.firebaseapp.com",
  projectId: "chat-app-d18c8",
  storageBucket: "chat-app-d18c8.appspot.com",
  messagingSenderId: "389760416990",
  appId: "1:389760416990:web:f95377014a99d22737d64f",
  measurementId: "G-VQLVMH3VL2"
};

// Initialize Firebase
// const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth= getAuth();
export const storage=getStorage();
export const db = getFirestore(app);