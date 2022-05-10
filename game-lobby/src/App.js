import React, { useContext, useEffect, useState } from 'react'
import './App.css';
import Lobby from './components/Lobby'
import Playerbox from './components/Playerbox';
import Playerbox2 from './components/Playerbox2';
import Playerbox3 from './components/Playerbox3';
import Playerbox4 from './components/Playerbox4';
import AuthPage from './AuthPage'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import db from './Firebase/FirebaseInit';
import { getDoc, doc, onSnapshot } from 'firebase/firestore'

import { SelectedColorsContext } from './Contexts/SelectedColors';
import { CurrentUsersContext } from './Contexts/CurrentUserContext';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid';




function App() {

  const auth = getAuth();
  const user = auth.currentUser;



  const [p1, P1Color] = useState('');
  const [p2, P2Color] = useState('');
  const [p3, P3Color] = useState('');
  const [p4, P4Color] = useState('');


  const [CurrentUserUID, setCurrentUserUID] = useState('unSet');
  const [P1ColorUID, setP1ColorUID] = useState();
  const [P2ColorUID, setP2ColorUID] = useState();
  const [P3ColorUID, setP3ColorUID] = useState();
  const [P4ColorUID, setP4ColorUID] = useState();

  //const docRef = doc(db, 'users', CurrentUserUID);

  //runs only once after components are loaded
  useEffect(() => {
    //subscribing to auth changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //User signed in
        console.log('user signed in:', user)

        //set the current user UID context
        const uid = user.uid;
        setCurrentUserUID(uid)

        //get the document from the server and store all of the values into contexts
        const docRef = doc(db, 'users', uid)
        getDoc(docRef).then((doc) => {
          setP1ColorUID(doc.data().P1Color)
          setP2ColorUID(doc.data().P2Color)
          setP3ColorUID(doc.data().P3Color)
          setP4ColorUID(doc.data().P4Color)

        })
        console.log(uid);
      }
      else {
        //user signed out/no user signed in
        console.log('no user signed in:')
        setCurrentUserUID('unSet');

      }
    });

    return unsubscribe;
  }, []);



  return (
    <CurrentUsersContext.Provider value={{ CurrentUserUID, P1ColorUID, P2ColorUID, P3ColorUID, P4ColorUID, setP1ColorUID, setP2ColorUID, setP3ColorUID, setP4ColorUID }}>
      <SelectedColorsContext.Provider value={{ p1, p2, p3, p4, P1Color, P2Color, P3Color, P4Color }}>
        <Router>
          <Routes>
            <Route path="/" element={
              <Box>
                {/* Lobby Title */}
                <Lobby />
                {/* Player Boxes */}
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
      </SelectedColorsContext.Provider>
    </CurrentUsersContext.Provider>
  );

}



export default App;
