import * as React from 'react'
import '../../css/Book.css'
import { Grid, Typography, Button } from '@mui/material'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'
import { useLocation } from 'react-router-dom'

const BookOverview = ({
  book,
  handleOpenModel,
  recommender,
  status,
  adminId,
  user,
}) => {
  let location = useLocation()
  const [readMore, setReadMore] = React.useState(false)

  const handleReadMoreToggle = () => {
    setReadMore((prevRead) => !prevRead)
  }
  return (
    <Grid container spacing={3}>
      <Grid
        item
        container
        xs={12}
        md={6}
        spacing={2}
        alignItems='center'
        flexDirection='column'>
        {location.pathname.includes('wishlist') && (
          <Grid item textAlign='center'>
            <Typography component='p' variant='subtitle2' align='center'>
              Suggested By:
              <br /> {recommender}
            </Typography>
          </Grid>
        )}
        <Grid item>
          <img
            src={`${book.imageURL.split(/\._\D{2}\d{2}_/).join('')}`}
            alt={book.title}
            className={
              location.pathname.includes('/book/') ? 'book' : 'book book-sm'
            }
          />
        </Grid>

        {location.pathname.includes('wishlist') && (
          <Grid
            item
            container
            flexDirection='column'
            spacing={2}
            alignItems='center'>
            {adminId === user.id && (
              <Grid item>
                <Button
                  variant='contained'
                  color='secondary'
                  className='btn b-radius'
                  startIcon={<BookmarkAddIcon />}>
                  Select For Book Club
                </Button>
              </Grid>
            )}
            {adminId === user.id || user.name === recommender ? (
              <Grid item>
                <Button
                  variant='text'
                  className='b-radius btn'
                  color='error'
                  //   onClick={handleOpenModel}
                >
                  Remove From Wishlist
                </Button>
              </Grid>
            ) : null}
          </Grid>
        )}
      </Grid>
      <Grid item container xs={12} md={6} flexDirection='column' wrap='nowrap'>
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
