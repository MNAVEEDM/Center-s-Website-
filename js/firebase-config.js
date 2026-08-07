// Firebase initialization — CDN modular SDK (v10.7.0), no build tool required.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyClnvvdfyybRRiZWOUdGgsJ4aACBOzTDmQ",
  authDomain: "cias-contact-system.firebaseapp.com",
  projectId: "cias-contact-system",
  storageBucket: "cias-contact-system.firebasestorage.app",
  messagingSenderId: "4681484161",
  appId: "1:4681484161:web:e8d7796a34e4354a2c8a80",
  measurementId: "G-LJ20KWQB4Z"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
