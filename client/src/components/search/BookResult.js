import React from 'react'
import '../../css/Book.css'
import { Typography, Grid, Button } from '@mui/material'

const BookResult = ({ book }) => {
  return (
    <Grid container item xs={12} md={6} lg={4}>
      <Grid item xs={4} textAlign='center'>
        <img
          src={`${book.smallImageURL.split(/\._\D{2}\d{2}_/).join('')}`}
          alt={book.title}
          className='book'
        />
      </Grid>
      <Grid
        item
        container
        xs={8}
        flexDirection='column'
        alignItems='flex-start'
        justifyContent='center'
        sx={{ pl: 2 }}>
        <Typography component='h3' variant='h6' align='left'>
          {book.title}
        </Typography>
        <Typography component='p' variant='subtitle2' align='left'>
          {book.author}
        </Typography>
        <div className='padding-top-sm'>
          <Button
            // onClick={handleViewListClick}
            variant='outlined'
            color='secondary'
            className='b-radius'>
            View Book
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default BookResult
