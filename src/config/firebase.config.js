import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBH_0fSMJ-gYN4RdJG2yZkxz2VTtGVGedM",
  authDomain: "codepan-17866.firebaseapp.com",
  projectId: "codepan-17866",
  storageBucket: "codepan-17866.appspot.com",
  messagingSenderId: "39399875441",
  appId: "1:39399875441:web:cec6488dec93d2da568cd0"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
