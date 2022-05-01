import './App.css';
import Lobby from './components/Lobby'
import Playerbox from './components/Playerbox';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';




function App() {
  return (
    <Container display="flex" justifyContent="center" alignItems="center">

      {/* Lobby Title */}
      <Lobby />
      {/* Player Boxes */}
      <Grid container spacing={8} justify="center">
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

    </Container>
  );
}

export default App;
