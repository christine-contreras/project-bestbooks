import React from 'react'
import '../../css/Profile.css'
import { Outlet } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { Grid } from '@mui/material'

import ProfileMenu from '../../components/nav/ProfileMenu'

const Profile = ({ user }) => {
  let navigate = useNavigate()
  return (
    <Grid container className='profile-container' justifyContent='stretch'>
      {!user ? (
        navigate('/login')
      ) : (
        <>
          <Grid item className='profile-menu' xs={12} md={4} lg={3}>
            <ProfileMenu user={user} />
          </Grid>

          <Grid
            item
            container
            flexDirection='column'
            spacing={3}
            xs={12}
            md={8}
            lg={9}
            sx={{ p: 4 }}>
            <Outlet />
          </Grid>
        </>
      )}
    </Grid>
  )
}

export default Profile
