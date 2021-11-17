import React from 'react'
import '../css/Nav.css'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import BookmarkIcon from '@mui/icons-material/Bookmark'

import NavLoggedIn from '../components/nav/NavLoggedIn'
import NavLoggedOut from '../components/nav/NavLoggedOut'

import { Link } from 'react-router-dom'

const Nav = ({ user }) => {
  return (
    <MuiAppBar color='transparent' position='fixed' elevation={0}>
      <Toolbar className='flex'>
        <Link to='/'>
          <Typography
            component='h1'
            variant='h5'
            color='inherit'
            noWrap
            className='flex'
            align='center'>
            <BookmarkIcon sx={{ fontSize: '3em' }} color='secondary' />
            <span className='logo'>Best Books</span>
          </Typography>
        </Link>
        {!user ? <NavLoggedOut /> : <NavLoggedIn />}
      </Toolbar>
    </MuiAppBar>
  )
}

export default Nav
