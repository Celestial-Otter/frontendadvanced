import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import {createContext} from 'react'




// App's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
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

//collection reference
const colRef = collection(db, 'players');

//gets collection data, getDocs is a JS promise and returns a snapshot of the database
getDocs(colRef).then((snapshot) => {
  let playerInfo = []
  snapshot.docs.forEach((doc) =>{
    playerInfo.push({ ...doc.data(), id: doc.id })
  })
  console.log(playerInfo) //console log all the collected data
})
.catch(e => {
  console.log(e.message)
})




//get a single document
const docRef = doc(db, 'players', 'AmPPLsGOWNutBSIli9xe') //keyboard spam = document ID of player 1

// gets the passed in document once
// getDoc(docRef).then((doc) => {
//   console.log(doc.data(), doc.id)
// })

//runs when change happens to passed in document and when page is first loaded
onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id)
})


//updating a document
updateDoc(docRef, { color: 'blue' })