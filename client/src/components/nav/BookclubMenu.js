import * as React from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BookClubInfo from '../bookclub/BookClubInfo'

import { Grid, Paper, MenuList, MenuItem } from '@mui/material'

const BookclubMenu = ({ user, bookclub }) => {
  let navigate = useNavigate()
  let location = useLocation()
  // const [admin, setAdmin] = React.useState(false)

  React.useEffect(() => {
    // setAdmin(user.id === bookclub.admin.id ? true : false)
  }, [])

  return (
    <Paper sx={{ p: 4 }}>
      <Grid
        container
        item
        flexDirection='column'
        wrap='nowrap'
        alignItems='center'
        justifyContent='center'>
        <BookClubInfo name={bookclub.name} members={bookclub.users} />
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

          {user && bookclub && user.id === bookclub.admin.id && (
            <MenuItem
              className={
                location.pathname === '/profile/my-bookclubs' ? 'active' : null
              }>
              <Link to={`/bookclub/${bookclub.id}/admin-dashboard`}>
                Admin Dashboard{' '}
              </Link>
            </MenuItem>
          )}
        </MenuList>
      </Grid>
    </Paper>
  )
}

export default BookclubMenu
