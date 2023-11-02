import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBNwVo6ivYgKqBCjehJIexiuBYJKJldRRY",
    authDomain: "healthease-a9de3.firebaseapp.com",
    projectId: "healthease-a9de3",
    storageBucket: "healthease-a9de3.appspot.com",
    messagingSenderId: "984353432529",
    appId: "1:984353432529:web:dbf69925eb7518c3da36f0"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFiresore(app);
