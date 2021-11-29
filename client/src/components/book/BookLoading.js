import React from 'react'
import { Grid, Typography } from '@mui/material'
import { Skeleton } from '@mui/material'

const BookLoading = () => {
  return (
    <Grid item container spacing={2} alignItems='center'>
      <Grid item xs={12} lg={4}>
        <Skeleton variant='rectangular' width='100%' height='400px'></Skeleton>
      </Grid>
      <Grid item container xs={12} lg={6} flexDirection='column' wrap='nowrap'>
        <Grid item sx={{ pb: 3 }}>
          <Typography component='div' variant='h4' align='left'>
            <Skeleton variant='rectangular' width='100%'></Skeleton>
          </Typography>
        </Grid>
        <Grid item sx={{ pb: 3 }}>
          <Skeleton
            variant='rectangular'
            width='100%'
            height='200px'></Skeleton>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default BookLoading
