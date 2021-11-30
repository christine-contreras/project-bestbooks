import React from 'react'
import Button from '@mui/material/Button'

import { useNavigate } from 'react-router'

const NavLoggedOut = () => {
  let navigate = useNavigate()

  return (
    <>
      <div className='nav-buttons'>
        <Button
          variant='text'
          color='secondary'
          sx={{ color: 'text.primary', marginRight: 2 }}
          className='link b-radius'
          onClick={() => navigate(`/login`)}>
          Log In
        </Button>

        <Button
          onClick={() => navigate(`/join-bestbooks`)}
          variant='contained'
          className='b-radius btn'>
          Sign Up
        </Button>
      </div>
    </>
  )
}

export default NavLoggedOut
