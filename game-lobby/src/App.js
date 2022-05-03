import React from 'react'
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

function App() {
  return (
    <Router>
    <Routes>
    <Route path="/" element={
      <Box>
      {/* Lobby Title */}
      <Lobby />
      {/* Player Boxes */}
      <SelectedColorsContext.Provider>
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

      <Link to='/other'>
        <btn>go to other</btn>
      </Link>
    </Box>
    }/>
    
    <Route path="/other" element={<Other />} />
    </Routes>
    </Router>
  );
}

export default App;
