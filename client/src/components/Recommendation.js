import React from 'react'
import '../css/Book.css'
import { Grid, Typography, Button } from '@mui/material'

const Recommendation = ({ book }) => {
  const title = book.title.split(' by ')[0]
  const author = book.title.split(' by ')[1]
  return (
    <Grid container item xs={12} sm={6} lg={3}>
      <Grid item xs={6} textAlign='center'>
        <img src={book.imageURL} alt={book.title} className='book' />
      </Grid>
      <Grid item container xs={6} flexDirection='column' className='book-info'>
        <Grid item>
          <Typography component='h3' variant='h6' align='left'>
            {title}
          </Typography>
          <Typography component='p' variant='subtitle2' align='left'>
            {author}
          </Typography>
        </Grid>
        <Grid item className='padding-top'>
          <Button variant='outlined' color='secondary' className='b-radius'>
            View Book
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Recommendation
