// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-hive-bf710.firebaseapp.com",
  projectId: "blog-hive-bf710",
  storageBucket: "blog-hive-bf710.appspot.com",
  messagingSenderId: "1038739130769",
  appId: "1:1038739130769:web:9d822a8f0fb3f9ef83b230",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
