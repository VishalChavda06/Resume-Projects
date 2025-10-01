import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJvnQwbRCMWkC9GNXkhk2VNRZHQ0CmDAw",
  authDomain: "fir-crud-8a3ea.firebaseapp.com",
  projectId: "fir-crud-8a3ea",
  storageBucket: "fir-crud-8a3ea.firebasestorage.app",
  messagingSenderId: "337207803272",
  appId: "1:337207803272:web:da3bb9f2bba258523d0e3d"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore