import React, { useState } from 'react'
import './App.css';
import Lobby from './components/Lobby'
import Playerbox from './components/Playerbox';
import Playerbox2 from './components/Playerbox2';
import Playerbox3 from './components/Playerbox3';
import Playerbox4 from './components/Playerbox4';
import AuthPage from './AuthPage'
import { getAuth, onAuthStateChanged } from 'firebase/auth'


import { SelectedColorsContext } from './Contexts/SelectedColors';
import { CurrentUsersContext } from './Contexts/CurrentUserContext';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid';




function App() {

  const auth = getAuth();
  //const user = auth.currentUser;



  const [p1, P1Color] = useState('white');
  const [p2, P2Color] = useState('white');
  const [p3, P3Color] = useState('white');
  const [p4, P4Color] = useState('white');
  const [CurrentUserUID, setCurrentUserUID] = useState('unSet');


  //subscribing to auth changes
  onAuthStateChanged(auth, (user) => {
    if (user) {
      //User signed in
      //console.log('user signed in:', user)

      const uid = user.uid;
      setCurrentUserUID(uid);
      //console.log("updated UID to:", CurrentUserUID);
    }
    else {
      //user signed out
      //console.log('user signed out:')
      setCurrentUserUID('');
      //console.log("updated UID to:", CurrentUserUID);
    }
  })



  return (
    <CurrentUsersContext.Provider value={{CurrentUserUID}}>
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
