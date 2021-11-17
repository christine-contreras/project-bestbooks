import React from 'react'
import Button from '@mui/material/Button'
import { brown } from '@mui/material/colors'

const NavLoggedOut = () => {
  return (
    <>
      <div className='nav-buttons'>
        <Button variant='text' sx={{ color: brown[900] }} className='link'>
          Log In
        </Button>

        <Button variant='contained' className='b-radius btn'>
          Sign Up
        </Button>
      </div>
    </>
  )
}

export default NavLoggedOut