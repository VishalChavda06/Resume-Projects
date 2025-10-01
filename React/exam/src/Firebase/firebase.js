import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBIh7CbRj7-kj6CSOT67_JybYaiD2qt54Q",
    authDomain: "exam-4bae6.firebaseapp.com",
    projectId: "exam-4bae6",
    storageBucket: "exam-4bae6.firebasestorage.app",
    messagingSenderId: "276075406632",
    appId: "1:276075406632:web:e58ec3f05724aea62b1c1d",
    measurementId: "G-NWBTJ74WNS"
  };


const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

