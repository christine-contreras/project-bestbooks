import React from 'react'
import { Grid, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  let navigate = useNavigate()
  return (
    <Grid container flexDirection='column' wrap='nowrap' alignItems='center'>
      <Typography component='h1' variant='h4' align='center'>
        Nothing To See Here
      </Typography>
      <Typography component='p' variant='subtitle1' align='center'>
        We can't seem to find what you are looking for.
      </Typography>
      <div className='padding-top'>
        <Button
          onClick={() => navigate('/search')}
          variant='contained'
          className='b-radius btn btn-lg'
          color='primary'>
          Search For A Book
        </Button>
      </div>
    </Grid>
  )
}

export default NotFound
