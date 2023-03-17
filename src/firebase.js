// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVomvwWPtNa1RM-Bs-IHwZHMQf70X5Q-M",
  authDomain: "greydive-challenge-fd3c7.firebaseapp.com",
  projectId: "greydive-challenge-fd3c7",
  storageBucket: "greydive-challenge-fd3c7.appspot.com",
  messagingSenderId: "493581264932",
  appId: "1:493581264932:web:0deb0fcc65d1821ee1d0b1",
  measurementId: "G-3MHP37QJKM"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;