import React from 'react'
import { Outlet } from 'react-router'
import { Grid, Paper } from '@mui/material'

const BookPage = () => {
  return (
    <Paper sx={{ p: 5 }}>
      <Outlet />
    </Paper>
  )
}

export default BookPage
