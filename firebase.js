// config/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Constants from "expo-constants";

const firebaseConfig = {
    apiKey: Constants.manifest?.extra?.firebaseApiKey,
    authDomain: Constants.manifest?.extra?.firebaseAuthDomain,
    projectId: Constants.manifest?.extra?.firebaseProjectId,
    storageBucket: Constants.manifest?.extra?.firebaseStorageBucket,
    messagingSenderId: Constants.manifest?.extra?.firebaseMessagingSenderId,
    appId: Constants.manifest?.extra?.firebaseAppId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
