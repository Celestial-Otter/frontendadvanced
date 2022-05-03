import { Container } from '@mui/material'
import React from 'react'
import Dropdown from './Dropdown'




const Playerbox = () => {

    //Getting Color from child dropdown
const [childColor, getChildColor] = React.useState('white');

const changeColor = (getColor) => {
    getChildColor(getColor)
}

    return (
        <Container style={{backgroundColor: childColor}} className='playerbox'>
            <h1>P2</h1>
            <Dropdown getColor={changeColor}/>
        </Container>
        
    )
}


Playerbox.defaultProps = {
    player: "Undefined"
}



export default Playerbox