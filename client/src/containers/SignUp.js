import * as React from 'react'
import '../css/Form.css'
import { Grid, Typography, Paper } from '@mui/material'

import FormSignup from '../components/form/FormSignup'

const SignUp = ({ onLogin }) => {
  return (
    <Paper elevation={0}>
      <Grid
        container
        spacing={0}
        sx={{ padding: 0 }}
        alignItems='stretch'
        justifyContent='center'>
        <Grid
          item
          container
          xs={12}
          lg={6}
          className='padding'
          alignItems='center'
          justifyContent='center'
          direction='column'>
          <Typography component='h1' variant='h3' align='center'>
            Create An Account
          </Typography>
          <FormSignup onLogin={onLogin} />
        </Grid>

        <Grid item xs={0} md={6} className='img-background'>
          {/* <img
            src='https://images.unsplash.com/photo-1548191194-b3d4f051fd7d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format'
            className='img-responsive'
          /> */}
        </Grid>
      </Grid>
    </Paper>
  )
}

export default SignUp
