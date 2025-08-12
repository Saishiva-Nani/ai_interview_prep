// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAAsVmQFlbH-hj6Yfzezv5KQo6DstWC3o",
  authDomain: "prepwise-31b1c.firebaseapp.com",
  projectId: "prepwise-31b1c",
  storageBucket: "prepwise-31b1c.firebasestorage.app",
  messagingSenderId: "441196203225",
  appId: "1:441196203225:web:0613b4fb41536b3d8382c8",
  measurementId: "G-W58CLWNE33"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();


export const auth = getAuth(app);
export const db = getFirestore(app);