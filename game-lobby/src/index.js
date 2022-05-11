import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import db from './Firebase/FirebaseInit'
import { CurrentUsersContext } from './Contexts/CurrentUserContext';



import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, doc, onSnapshot, updateDoc, setDoc, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'


//TODO - MOVE ALL OF THIS INTO ANOTHER FILE
// App's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
// const firebaseConfig = {
//   apiKey: "AIzaSyD4AiuEYoLnxux3LmvARcaHfiqJBkAX3MY",
//   authDomain: "frontendadvanced-gamelobby.firebaseapp.com",
//   projectId: "frontendadvanced-gamelobby",
//   storageBucket: "frontendadvanced-gamelobby.appspot.com",
//   messagingSenderId: "209374709219",
//   appId: "1:209374709219:web:26975afd9190b807188cd6"
// };

// // Initialize Firebase
// initializeApp(firebaseConfig);

// //Initialize services, db is the reference to the firestore database
// const db = getFirestore();
const auth = getAuth();

//collection reference
const colRef = collection(db, 'players');

//gets collection data, getDocs is a JS promise and returns a snapshot of the database
// getDocs(colRef).then((snapshot) => {
//   let playerInfo = []
//   snapshot.docs.forEach((doc) => {
//     playerInfo.push({ ...doc.data(), id: doc.id })
//   })
//   console.log(playerInfo) //console log all the collected data
// })
//   .catch(e => {
//     console.log(e.message)
//   })




// //get a single document
// const docRef = doc(db, 'players', 'AmPPLsGOWNutBSIli9xe') //keyboard spam = document ID of player 1

// gets the passed in document once
// getDoc(docRef).then((doc) => {
//   console.log(doc.data(), doc.id)
// })

//runs when change happens to passed in document and when page is first loaded
// onSnapshot(docRef, (doc) => {
//   console.log(doc.data(), doc.id)
// })


//updating a document
//updateDoc(docRef, { color: 'blue' })

//signing users up using email and password
// ! Only works if Auth page is loaded twice?
// TODO Move all of this into a different function
window.onload = function () {
  //creating a new user
  const signupForm = document.querySelector('.signup')
  if(signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault()

      const email = signupForm.email.value
      const password = signupForm.password.value

      createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
          console.log('user created:', cred.user.uid);
          const userID = cred.user.uid;

          //creating the user document in firestore
          setDoc(doc(db, "users", userID), {
            UserEmail: email,
            P1Color: "white",
            P2Color: "white",
            P3Color: "white",
            P4Color: "white",
          });
          
          signupForm.reset();
        })
        .catch((e) => {
          console.log(e.message);
        })
    })
  }
  else {
    console.log("signupform:",signupForm)
  }


  //logging in
  const loginForm = document.querySelector('.login')
  if(loginForm) {
    
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault(e)

      const email = loginForm.email.value
      const password = loginForm.password.value
      signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
          console.log("user logged in:", cred.user)
        })
        .catch((e) => {
          console.log(e.message)
        })

    })
  }
  else{
    console.log("loginForm:", loginForm)
  }




  //logging out
  const logoutButton = document.querySelector('.logout')
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      signOut(auth)
        .then(() => {
          //console.log('the user signed out')
        })
        .catch((e) => {
          console.log(e)
        })
    })
  }
  else {
    console.log("logoutbutton:", logoutButton)
  }
}

// //subscribing to auth changes
// onAuthStateChanged(auth, (user) => {
//   if(user) {
//     //User signed in
//     //console.log('user signed in:', user)

//     const uid = user.uid;
//     console.log(uid);
//   } 
//   else {
//     //user signed out
//     console.log('user signed out:')

//   }
// })


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />

  </React.StrictMode>
);




reportWebVitals();
