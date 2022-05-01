import React from 'react'

const Lobby = ({title}) => {
  return (
    <h1 style={{align:"center"}}>{title}</h1>
  )
}

Lobby.defaultProps = {
    title: "Game Lobby"
}


export default Lobby