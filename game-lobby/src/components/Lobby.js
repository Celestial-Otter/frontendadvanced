import React from 'react'

const Lobby = ({title}) => {
  return (
    <h1 className='Title'>{title}</h1>
  )
}

Lobby.defaultProps = {
    title: "Game Lobby"
}


export default Lobby