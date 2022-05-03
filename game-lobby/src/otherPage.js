import React from 'react'
import {Link} from 'react-router-dom'

function otherPage() {
  return (
    <div>
    <h1>Other Page</h1>
    <Link to='/'>
      <btn>return</btn>
    </Link>
    </div>
  )
}

export default otherPage