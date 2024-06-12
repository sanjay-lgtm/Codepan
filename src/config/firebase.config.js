import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
    apiKey: "import.meta.env.REACT_APP_APIKEY",
    authDomain: "import.meta.env.REACT_APP_AUTHDOMAIN",
    projectId: "import.meta.env.REACT_APP_PROJECTID",
    storageBucket: "import.meta.env.REACT_APP_STORAGEBUCKET",
    messagingSenderId: "import.meta.env.REACT_APP_MESSAGING_SENDER_ID",
    appId: "import.meta.env.REACT_APP_ID"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
