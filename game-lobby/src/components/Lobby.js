import { Box } from '@mui/material'
import React from 'react'

const Lobby = ({title}) => {
  return (
    <Box className='title'>
    <h1 className='Title'>{title}</h1>
    </Box>
  )
}

Lobby.defaultProps = {
    title: "Game Lobby"
}


export default Lobby