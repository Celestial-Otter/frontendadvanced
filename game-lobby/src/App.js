import './App.css';
import Lobby from './components/Lobby'
import Playerbox from './components/Playerbox';

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid';


function App() {
  return (
    <Box>

      {/* Lobby Title */}
      <Lobby />


      {/* Player Boxes */}
      <Grid container spacing={8} justifyContent="center">
        <Grid item xs={6}>
          <Playerbox player={'P1'}/>
        </Grid>
        <Grid item xs={6}>
          <Playerbox player={'P2'}/>
        </Grid>
        <Grid item xs={6}>
          <Playerbox player={'P3'}/>
        </Grid>
        <Grid item xs={6}>
          <Playerbox player={'P4'}/>
        </Grid>
      </Grid>

    </Box>
  );
}

export default App;
