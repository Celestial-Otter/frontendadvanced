import { Box } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function AuthPage() {
  return (
    <Box>
      <Box className='title'>
        <h1>Create Account</h1>
      </Box>



      <Box className='formBox'>
        <form class="signup">
          <label form="email">email:</label>
          <input type="email" name="email"></input>
          <label type="password">password:</label>
          <input type="password" name="password"></input>
          <button>signup</button>
        </form>
      </Box>


      <Box className='title'>
        <h1>Sign In</h1>
      </Box>



      <Box className='formBox'>
        <form className="login">
          <label form="email">email:</label>
          <input type="email" name="email"></input>
          <label type="password">password:</label>
          <input type="password" name="password"></input>
          <button>Login</button>
        </form>
      </Box>






      <Link to='/'>
        <button>return</button>
      </Link>
    </Box>
  )
}

export default AuthPage