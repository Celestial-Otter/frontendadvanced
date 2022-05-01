import React from 'react'

const Playerbox = ({player}) => {
  return (
      <div className='playerbox'>
          <h4>{player}</h4> 
      </div>
  )
}


Playerbox.defaultProps = {
    player: "Undefined"
}



export default Playerbox