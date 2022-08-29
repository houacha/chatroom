// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABca5-N-v9cyN_tMY6y56OhqFqt_ugm_s",
  authDomain: "chatme-f590b.firebaseapp.com",
  projectId: "chatme-f590b",
  storageBucket: "chatme-f590b.appspot.com",
  messagingSenderId: "606779452894",
  appId: "1:606779452894:web:3831ecf0fd41707dee814f",
  measurementId: "G-QTWTLV7LRT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);