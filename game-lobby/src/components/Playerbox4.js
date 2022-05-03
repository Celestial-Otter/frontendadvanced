import { Container } from '@mui/material'
import React from 'react'
import Dropdown from './Dropdown'
import { SelectedColorsContext } from '../Contexts/SelectedColors'




const Playerbox = () => {

    const {P4Color} = React.useContext(SelectedColorsContext)

    //Getting Color from child dropdown
    const [childColor, getChildColor] = React.useState('white');
    const changeColor = (getColor) => {
    getChildColor(getColor)
    P4Color(getColor); //update player color value context
}

    return (
        <Container style={{backgroundColor: childColor}} className='playerbox'>
            <h1>P4</h1>
            <Dropdown getColor={changeColor}/>
        </Container>
        
    )
}


Playerbox.defaultProps = {
    player: "Undefined"
}



export default Playerbox