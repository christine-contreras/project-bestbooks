import React from 'react'
import { Outlet } from 'react-router'
import { Grid, Paper, Button } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useNavigate } from 'react-router'

const BookPage = () => {
  let navigate = useNavigate()
  return (
    <>
      <Grid container spacing={2}>
        <Button
          variant='text'
          color='secondary'
          sx={{ color: 'text.primary', p: 2 }}
          className='link b-radius'
          startIcon={<ArrowBackIosIcon />}
          onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Grid>
      <Paper sx={{ p: 5 }}>
        <Outlet />
      </Paper>
    </>
  )
}

export default BookPage
