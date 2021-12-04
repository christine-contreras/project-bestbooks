import React from 'react'
import '../../css/Bookclub.css'
import { Outlet } from 'react-router'
import { Grid } from '@mui/material'

const BookClubPage = () => {
  return (
    <Grid
      container
      className='bookclub-container'
      justifyContent='stretch'
      spacing={4}>
      <Outlet />
    </Grid>
  )
}

export default BookClubPage
