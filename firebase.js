import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcwPtnzT_wvqd4uIS7RV6lwL0_r0JXtvY",
  authDomain: "promptpal-3a580.firebaseapp.com",
  projectId: "promptpal-3a580",
  storageBucket: "promptpal-3a580.firebasestorage.app",
  messagingSenderId: "681352536413",
  appId: "1:681352536413:web:ef9629e7bca26cfbc608b4",
  measurementId: "G-3FS6PGZRYE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
