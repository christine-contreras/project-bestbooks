import React from 'react'
import { Grid, Typography, Button } from '@mui/material'
import { useLocation } from 'react-router-dom'

const BookOverview = ({ book, handleOpenModel }) => {
  let location = useLocation()
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} textAlign='center'>
        <img
          src={`${book.imageURL.split(/\._\D{2}\d{2}_/).join('')}`}
          alt={book.title}
          className='book'
        />
      </Grid>
      <Grid item container xs={12} md={6} flexDirection='column' wrap='nowrap'>
        <Grid item sx={{ pb: 3 }}>
          <Typography component='h1' variant='h4' align='left'>
            {book.title}
          </Typography>
          <Typography component='p' variant='subtitle1' align='left'>
            By {book.author.name}
          </Typography>
        </Grid>

        <Grid item sx={{ pb: 3 }}>
          <Typography variant='p'>{book.description}</Typography>
        </Grid>

        <Grid item container spacing={2} sx={{ pb: 3 }}>
          {book.genres.map((genre) => (
            <Grid item key={genre}>
              <Typography component='p' variant='subtitle2' className='genre'>
                {genre}
              </Typography>
            </Grid>
          ))}
        </Grid>

        <Grid item sx={{ pt: 3 }}>
          {location.pathname.includes('/book/') && (
            <Button
              onClick={handleOpenModel}
              variant='contained'
              className='b-radius btn btn-lg'
              color='primary'>
              Add To Book Club
            </Button>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default BookOverview
