import { Box } from '@mui/material'
import { getAuth } from 'firebase/auth';
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProfilePicture from './components/ProfilePicture';
import { CurrentUsersContext } from './Contexts/CurrentUserContext'

function AuthPage() {
  const {CurrentUserUID} = React.useContext(CurrentUsersContext)

  return (
    <Box>
      <Box className='title'>
        <h1>Create Account</h1>
      </Box>



      <Box className='formBox'>
        <form className="signup">
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

      <Box className='formBox'>
        <button className='logout'>logout</button>
        <Link to='/'>
          <button>return</button>
        </Link>
      </Box>

      <Box className='formBox'>
      {CurrentUserUID !== 'unSet' && <ProfilePicture />}
      </Box>
    </Box>
  )
}

export default AuthPage