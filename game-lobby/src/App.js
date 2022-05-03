import React, { useState } from 'react'
import './App.css';
import Lobby from './components/Lobby'
import Playerbox from './components/Playerbox';
import Playerbox2 from './components/Playerbox2';
import Playerbox3 from './components/Playerbox3';
import Playerbox4 from './components/Playerbox4';
import Other from './otherPage'


import { SelectedColorsContext } from './Contexts/SelectedColors';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';


import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid';

// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { collection, addDoc, getDocs } from "firebase/firestore";





// // App's Firebase project configuration
// // See: https://firebase.google.com/docs/web/learn-more#config-object
// const firebaseConfig = {
//   apiKey: "AIzaSyD4AiuEYoLnxux3LmvARcaHfiqJBkAX3MY",
//   authDomain: "frontendadvanced-gamelobby.firebaseapp.com",
//   projectId: "frontendadvanced-gamelobby",
//   storageBucket: "frontendadvanced-gamelobby.appspot.com",
//   messagingSenderId: "209374709219",
//   appId: "1:209374709219:web:26975afd9190b807188cd6"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


// // Initialize Cloud Firestore and get a reference to the service
// const db = getFirestore(app);



// //Add a new collection and a document
// try {
//   const docRef = await addDoc(collection(db, "users"), {
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
//   });
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }


// // Add a second document with a generated ID.
// try {
//   const docRef = await addDoc(collection(db, "users"), {
//     first: "Alan",
//     middle: "Mathison",
//     last: "Turing",
//     born: 1912
//   });

//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }



// //get the entire collection
// const querySnapshot = await getDocs(collection(db, "users"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });







function App() {

const [p1, P1Color] = useState('');
const [p2, P2Color] = useState('');
const [p3, P3Color] = useState('');
const [p4, P4Color] = useState('');


  return (
    <Router>
    <Routes>
    <Route path="/" element={
      <Box>
      {/* Lobby Title */}
      <Lobby />

      {/* Player Boxes */}
      <SelectedColorsContext.Provider value ={{p1, p2, p3, p4, P1Color, P2Color, P3Color, P4Color}}>
      <Grid container spacing={8} justifyContent="center">
        <Grid item xs={6}>
          <Playerbox/>
        </Grid>
        <Grid item xs={6}>
          <Playerbox2/>
        </Grid>
        <Grid item xs={6}>
          <Playerbox3/>
        </Grid>
        <Grid item xs={6}>
          <Playerbox4/>
        </Grid>
      </Grid>
      </SelectedColorsContext.Provider>

      {/* Link for Routing to other */}
      <Link to='/other'>
        <btn>go to other</btn>
      </Link>
    </Box>
    }/>
    
    {/* Segment for 'other'*/}
    <Route path="/other" element={<Other />} />
    </Routes>
    </Router>
  );
}

export default App;
