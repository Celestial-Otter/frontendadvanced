import React, { useState } from 'react'
import './App.css';
import Lobby from './components/Lobby'
import Playerbox from './components/Playerbox';
import Playerbox2 from './components/Playerbox2';
import Playerbox3 from './components/Playerbox3';
import Playerbox4 from './components/Playerbox4';
import AuthPage from './AuthPage'


import { SelectedColorsContext } from './Contexts/SelectedColors';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid';

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'


//TODO - MOVE ALL OF THIS INTO ANOTHER FILE
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
const auth = getAuth();

//collection reference
const colRef = collection(db, 'players');

//gets collection data, getDocs is a JS promise and returns a snapshot of the database
getDocs(colRef).then((snapshot) => {
  let playerInfo = []
  snapshot.docs.forEach((doc) => {
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


//signing users up using email and password
window.onload=function(){
  const signupForm = document.querySelector('.signup')
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault()
  
    const email = signupForm.email.value
    const password = signupForm.password.value
    
    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log('user created:', cred.user);
        signupForm.reset();
      })
      .catch((e) => {
        console.log(e.message);
      })
  })
}




function App() {

  const [p1, P1Color] = useState('white');
  const [p2, P2Color] = useState('white');
  const [p3, P3Color] = useState('white');
  const [p4, P4Color] = useState('white');


  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Box>
            {/* Lobby Title */}
            <Lobby />

            {/* Player Boxes */}
            <SelectedColorsContext.Provider value={{ p1, p2, p3, p4, P1Color, P2Color, P3Color, P4Color }}>
              <Grid container spacing={8} justifyContent="center">
                <Grid item xs={6}>
                  <Playerbox />
                </Grid>
                <Grid item xs={6}>
                  <Playerbox2 />
                </Grid>
                <Grid item xs={6}>
                  <Playerbox3 />
                </Grid>
                <Grid item xs={6}>
                  <Playerbox4 />
                </Grid>
              </Grid>
            </SelectedColorsContext.Provider>

            {/* Link for Routing to AuthPage */}
            <Link to='/Auth'>
              <button>Login</button>
            </Link>
          </Box>
        } />

        {/* Segment for 'AuthPage'*/}
        <Route path="/Auth" element={<AuthPage />} />
      </Routes>
    </Router>
  );
  
}



export default App;
