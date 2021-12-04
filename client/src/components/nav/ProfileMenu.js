import React from 'react'
import '../../css/Nav.css'
import { changeToInitials } from '../../helpers/helpers'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'

import {
  Grid,
  Paper,
  Avatar,
  Typography,
  MenuList,
  MenuItem,
} from '@mui/material'

const ProfileMenu = ({ user }) => {
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
        <Avatar sx={{ bgcolor: user.profile_color, width: 56, height: 56 }}>
          {changeToInitials(user.full_name)}
        </Avatar>
        <Typography component='p' variant='subtitle1' align='center' paddingTop>
          {user.full_name}
        </Typography>
      </Grid>

      <Grid item>
        <MenuList className='side-menu'>
          <MenuItem
            className={
              location.pathname === '/profile/my-info' ? 'active' : null
            }>
            <Link to='/profile/my-info'>My Info</Link>
          </MenuItem>
          <MenuItem
            className={
              location.pathname === '/profile/my-bookclubs' ? 'active' : null
            }>
            <Link to='/profile/my-bookclubs'>My Book Clubs</Link>
          </MenuItem>
        </MenuList>
      </Grid>
    </Paper>
  )
}

export default ProfileMenu
