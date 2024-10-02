// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyC6svX97WnYwsvA6CdWrhfaW7jIio2AdNM",
  authDomain: "monkey-blogging-25688.firebaseapp.com",
  projectId: "monkey-blogging-25688",
  storageBucket: "monkey-blogging-25688.appspot.com",
  messagingSenderId: "398137652231",
  appId: "1:398137652231:web:36d2973bd38d192f6226a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)