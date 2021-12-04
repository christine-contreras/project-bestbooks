import * as React from 'react'
import '../css/Form.css'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { Grid, Typography, Paper, Button, ButtonGroup } from '@mui/material'

import FormSignup from '../components/form/FormSignup'
import FormLogin from '../components/form/FormLogin'

const SignUp = ({ onLogin, onLogout, user }) => {
  let location = useLocation()
  let navigate = useNavigate()

  return (
    <Paper elevation={0}>
      <Grid
        container
        spacing={0}
        sx={{ padding: 0 }}
        alignItems='stretch'
        justifyContent='center'
        className='hero-container'>
        <Grid
          item
          container
          xs={12}
          lg={6}
          className='padding'
          alignItems='center'
          justifyContent='center'
          direction='column'>
          {!user ? (
            location.pathname === '/join-bestbooks' ? (
              <>
                <Typography component='h1' variant='h3' align='center'>
                  Create An Account
                </Typography>
                <FormSignup onLogin={onLogin} />
                <Link to='/login'>Already Have An Account? Login Here</Link>
              </>
            ) : (
              <>
                <Typography component='h1' variant='h3' align='center'>
                  Login To Best Books
                </Typography>
                <FormLogin onLogin={onLogin} />
                {/* <Link to='/join-bestbooks'>Not A Member Yet? Create A Login</Link> */}
              </>
            )
          ) : (
            <>
              <Typography component='h1' variant='h3' align='center'>
                You're Already Logged In
              </Typography>
              <Typography component='p' variant='subtitle1' align='center'>
                If you would like to create a new account please logout.
              </Typography>
              <div className='padding-top'>
                <ButtonGroup variant='contained' color='secondary'>
                  <Button className='btn' onClick={() => navigate(`/`)}>
                    Go To Homepage
                  </Button>
                  <Button className='btn' onClick={onLogout}>
                    Sign Out
                  </Button>
                </ButtonGroup>
              </div>
            </>
          )}
        </Grid>

        <Grid item xs={0} md={6} className='img-background'></Grid>
      </Grid>
    </Paper>
  )
}

export default SignUp
