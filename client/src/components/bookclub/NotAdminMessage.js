import React from 'react'
import { Grid, Typography } from '@mui/material'

const NotAdminMessage = ({ admin }) => {
  return (
    <Grid item container spacing={3} flexDirection='column'>
      <Grid item>
        <Typography component='h1' variant='h4' align='center' paddingTop>
          Access Denied
        </Typography>
      </Grid>
      <Grid item>
        <Typography component='p' variant='subtitle1' align='center' paddingTop>
          You don't have admin access. Please contact your admin for further
          help.
        </Typography>
      </Grid>
      <Grid item container flexDirection='column'>
        <Typography component='h1' variant='h5' align='center' paddingTop>
          Contact Admin
        </Typography>
        <Typography component='p' variant='subtitle1' align='center' paddingTop>
          name: {`${admin.first_name} ${admin.last_name}`}
        </Typography>
        <Typography component='p' variant='subtitle1' align='center'>
          email: {admin.email}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default NotAdminMessage
