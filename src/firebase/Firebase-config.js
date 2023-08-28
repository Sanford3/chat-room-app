// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwKRhYkGJ-CEJK6juorm_GkxeGK-ctVN8",
  authDomain: "chat-room-23c82.firebaseapp.com",
  projectId: "chat-room-23c82",
  storageBucket: "chat-room-23c82.appspot.com",
  messagingSenderId: "910935458266",
  appId: "1:910935458266:web:e05da41fa76ecfdc44c0e3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
