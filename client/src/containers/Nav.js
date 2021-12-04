import React from 'react'
import '../css/Nav.css'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import BookmarkIcon from '@mui/icons-material/Bookmark'

import NavLoggedIn from '../components/nav/NavLoggedIn'
import NavLoggedOut from '../components/nav/NavLoggedOut'

import { Link } from 'react-router-dom'

const Nav = ({ user, onLogout }) => {
  return (
    <MuiAppBar
      position='fixed'
      elevation={0}
      sx={{ backgroundColor: 'background.default', color: 'text.primary' }}>
      <Toolbar className='flex'>
        <Link to='/'>
          <Typography
            component='h1'
            variant='h5'
            color='inherit'
            noWrap
            className='flex'
            align='center'>
            <BookmarkIcon sx={{ fontSize: '3em' }} color='primary' />
            <span className='logo'>Best Books</span>
          </Typography>
        </Link>
        {!user ? (
          <NavLoggedOut />
        ) : (
          <NavLoggedIn user={user} onLogout={onLogout} />
        )}
      </Toolbar>
    </MuiAppBar>
  )
}

export default Nav
