import React from 'react'

const Lobby = ({title}) => {
  return (
    <div className = "lobbyTitle">
    <h1 className='Title'>{title}</h1>
    </div>
  )
}

Lobby.defaultProps = {
    title: "Game Lobby"
}


export default Lobby