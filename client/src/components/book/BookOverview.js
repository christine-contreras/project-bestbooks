import * as React from 'react'
import '../../css/Book.css'
import { Grid, Typography, Button } from '@mui/material'
import { useLocation } from 'react-router-dom'

const BookOverview = ({ book, handleOpenModel }) => {
  let location = useLocation()
  const [readMore, setReadMore] = React.useState(false)

  const handleReadMoreToggle = () => {
    setReadMore((prevRead) => !prevRead)
  }
  return (
    <Grid container spacing={2}>
      <Grid
        item
        container
        xs={12}
        md={location.pathname.includes('/book/') ? 6 : 12}
        lg={location.pathname.includes('/book/') ? 6 : 4}
        spacing={2}
        alignItems='center'
        flexDirection='column'>
        <Grid item>
          <img
            src={`${book.imageURL.split(/\._\D{2}\d{2}_/).join('')}`}
            alt={book.title}
            className={
              location.pathname.includes('/book/') ? 'book' : 'book book-sm'
            }
          />
        </Grid>
      </Grid>
      <Grid
        item
        container
        xs={12}
        md={location.pathname.includes('/book/') ? 6 : 12}
        lg={location.pathname.includes('/book/') ? 6 : 8}
        flexDirection='column'
        wrap='nowrap'>
        <Grid item sx={{ pb: 3 }}>
          <Typography component='h1' variant='h4' align='left'>
            {book.title}
          </Typography>
          <Typography component='p' variant='subtitle1' align='left'>
            By{' '}
            {location.pathname.includes('/book/')
              ? book.author.name
              : book.author}
          </Typography>
        </Grid>

        <Grid item container sx={{ pb: 3 }} spacing={2} flexDirection='column'>
          <Grid item>
            <Typography variant='p'>
              {readMore
                ? book.description
                : `${book.description.slice(0, 500)}...`}
            </Typography>
          </Grid>

          <Grid item alignSelf='flex-end'>
            <Button
              variant='text'
              sx={{ p: 2, fontWeight: 'bold' }}
              className='link b-radius'
              onClick={handleReadMoreToggle}>
              {readMore ? 'Read Less' : 'Read More'}
            </Button>
          </Grid>
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
        {location.pathname.includes('/book/') && (
          <Grid item sx={{ pt: 3 }}>
            <Button
              onClick={handleOpenModel}
              variant='contained'
              className='b-radius btn btn-lg'
              color='primary'>
              Add To Book Club
            </Button>
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}

export default BookOverview
