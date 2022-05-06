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
