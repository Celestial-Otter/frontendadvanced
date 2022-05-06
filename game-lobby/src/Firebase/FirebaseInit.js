import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyD4AiuEYoLnxux3LmvARcaHfiqJBkAX3MY",
    authDomain: "frontendadvanced-gamelobby.firebaseapp.com",
    projectId: "frontendadvanced-gamelobby",
    storageBucket: "frontendadvanced-gamelobby.appspot.com",
    messagingSenderId: "209374709219",
    appId: "1:209374709219:web:26975afd9190b807188cd6"
  };

  // Initialize Firebase
initializeApp(firebaseConfig);

//Initialize services, db is the reference to the firestore database
const db = getFirestore();

export default db;