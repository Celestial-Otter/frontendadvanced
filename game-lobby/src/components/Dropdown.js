import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SelectedColorsContext } from '../Contexts/SelectedColors';







const Dropdown = ({getColor}) => {
  const {p1, p2, p3, p4} = React.useContext(SelectedColorsContext)
  const [color, setColor] = React.useState('');
  
  const usedColorArray = [p1, p2, p3, p4]
  
  const handleChange = (e) => {
    //TODO ADD CHECK TO ENSURE COLOUR IS NOT BEING USED BY OTHER DROPDOWNS
    if (usedColorArray.indexOf(e.target.value) === -1){
      setColor(e.target.value);
      getColor(e.target.value);
    }
    else{
      console.log("Duplicate");
    }
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Color</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={color} label="Color" onChange={handleChange}>
          <MenuItem value={'blue'}>Blue</MenuItem>
          <MenuItem value={'red'}>Red</MenuItem>
          <MenuItem value={'green'}>Green</MenuItem>
          <MenuItem value={'pink'}>Pink</MenuItem>
          <MenuItem value={'yellow'}>Yellow</MenuItem>
          <MenuItem value={'purple'}>Purple</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}


export default Dropdown
