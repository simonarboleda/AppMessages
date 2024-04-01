import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAJqD9f_mKBAcvFM40AMc5Lc8SW5JmNy9U",
  authDomain: "chat-1d13e.firebaseapp.com",
  projectId: "chat-1d13e",
  storageBucket: "chat-1d13e.appspot.com",
  messagingSenderId: "564005029360",
  appId: "1:564005029360:web:ae725365f99f720fa2c935"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth (app);
export const provider = new GoogleAuthProvider ();
export const db = getFirestore(app);