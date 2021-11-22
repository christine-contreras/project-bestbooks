import React from 'react'
import '../css/Form.css'
import FormProfile from '../components/form/FormProfile'
import { Grid, Typography } from '@mui/material'

const ProfileInfo = ({ user, handleCheckLogin }) => {
  return (
    <>
      <Grid item>
        <Typography component='h1' variant='h4' align='center' paddingTop>
          Edit Profile
        </Typography>
      </Grid>
      <Grid item>
        <FormProfile user={user} handleCheckLogin={handleCheckLogin} />
      </Grid>
    </>
  )
}

export default ProfileInfo
