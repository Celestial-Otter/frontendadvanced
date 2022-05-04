import React from 'react'
import {Link} from 'react-router-dom'

function otherPage() {
  return (
    <div>
    <h1>Other Page</h1>
    <Link to='/'>
      <button>return</button>
    </Link>
    </div>
  )
}

export default otherPage