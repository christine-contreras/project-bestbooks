import React from 'react'
import { Grid, Typography } from '@mui/material'

const HomeRecs = () => {
  return (
    <Grid container direction='column' className='padding-top'>
      <Typography component='h2' variant='h4' align='center' paddingTop>
        Recommended Books
      </Typography>
      <Grid container item spacing={3}></Grid>
    </Grid>
  )
}

export default HomeRecs
