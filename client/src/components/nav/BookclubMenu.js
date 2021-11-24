import React from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BookclubInfo from '../bookclub/BookclubInfo'

import { Grid, Paper, MenuList, MenuItem } from '@mui/material'

const BookclubMenu = ({ user, bookclub }) => {
  let navigate = useNavigate()
  let location = useLocation()
  return (
    <Paper sx={{ p: 4 }}>
      <Grid
        container
        item
        flexDirection='column'
        wrap='nowrap'
        alignItems='center'
        justifyContent='center'>
        <BookclubInfo name={bookclub.name} members={bookclub.users} />
      </Grid>

      <Grid item>
        <MenuList className='side-menu'>
          <MenuItem
            className={
              location.pathname === '/profile/my-info' ? 'active' : null
            }>
            <Link to='/profile/my-info'>Currently Reading</Link>
          </MenuItem>
          <MenuItem
            className={
              location.pathname === '/profile/my-bookclubs' ? 'active' : null
            }>
            <Link to='/profile/my-bookclubs'>Book Wishlist</Link>
          </MenuItem>

          <MenuItem
            className={
              location.pathname === '/profile/my-bookclubs' ? 'active' : null
            }>
            <Link to='/profile/my-bookclubs'>Book History</Link>
          </MenuItem>

          <MenuItem
            className={
              location.pathname === '/profile/my-bookclubs' ? 'active' : null
            }>
            <Link to='/profile/my-bookclubs'>Admin Dashboard</Link>
          </MenuItem>
        </MenuList>
      </Grid>
    </Paper>
  )
}

export default BookclubMenu
