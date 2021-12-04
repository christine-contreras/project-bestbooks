import React from 'react'
import '../../css/Hero.css'
import { Grid, Typography, Paper, Button } from '@mui/material'

import { useNavigate } from 'react-router-dom'

const Hero = ({ user }) => {
  let navigate = useNavigate()

  return (
    <Grid
      container
      spacing={2}
      className='hero b-radius-sm'
      sx={{ padding: 0 }}>
      <Paper elevation={0} className='b-radius-sm'>
        <Grid item xs={12} alignItems='center'>
          <Typography component='h1' variant='h1' align='left'>
            Read Together. <br />
            Stay Connected.
          </Typography>
          <Typography component='p' variant='subtitle1' align='left'>
            Explore a new world with your friends and family.
          </Typography>
          <div className='padding-top'>
            <Button
              onClick={() =>
                navigate(!user ? `/join-bestbooks` : `/profile/my-bookclubs`)
              }
              variant='contained'
              className='b-radius btn btn-lg'
              color='primary'>
              Start A Book Club
            </Button>
          </div>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default Hero
