import React from 'react'
import '../../css/Book.css'
import { Grid, Typography } from '@mui/material'

const Recommendation = ({ book }) => {
  const title = book.title.split(' by ')[0]
  const author = book.title.split(' by ')[1]

  return (
    <Grid container item xs={12} sm={6} lg={3} className='recommendation'>
      <Grid item xs={12} textAlign='center'>
        <img
          src={`${book.imageURL.split(/\._\D{2}\d{2}_/).join('')}`}
          alt={book.title}
          className='book'
        />
      </Grid>
      <Grid
        item
        container
        xs={12}
        flexDirection='column'
        className='book-info'
        sx={{ pl: 2 }}>
        <Grid item>
          <Typography component='h3' variant='h6' align='center'>
            {title}
          </Typography>
          <Typography component='p' variant='subtitle2' align='center'>
            {author}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Recommendation
