import { Container } from '@mui/material'
import React from 'react'
import Dropdown from './Dropdown'


//Getting Color???
const changeColor = (getChildColor) => {
    console.log(getChildColor)
}
//changeColor == addTask
// getChildColor == task

const Playerbox = ({ player }) => {
    const [childColor, getChildColor] = React.useState('');

    return (
        <Container bgcolor="primary.main" className='playerbox'>
            <h1>{player}</h1>
            <Dropdown getColor={changeColor}/>
            {/* getColor == onAdd */}
        </Container>
    )
}


Playerbox.defaultProps = {
    player: "Undefined"
}



export default Playerbox