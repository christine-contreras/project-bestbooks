import * as React from 'react'
import '../../css/Book.css'
import { Grid, Typography, Button, Fab, Tooltip } from '@mui/material'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import EditIcon from '@mui/icons-material/Edit'
import { useLocation } from 'react-router-dom'

const BookOverview = ({
  book,
  handleOpenModel,
  status,
  edit,
  handleOpenStatusModel,
  isCurrentBook,
  user,
}) => {
  let location = useLocation()
  const [readMore, setReadMore] = React.useState(false)

  const handleReadMoreToggle = () => {
    setReadMore((prevRead) => !prevRead)
  }

  return (
    <Grid container spacing={2}>
      {book && (
        <>
          <Grid
            item
            container
            xs={12}
            md={location.pathname.includes('/book/') ? 6 : 12}
            lg={location.pathname.includes('/book/') ? 6 : 4}
            spacing={2}
            alignItems='center'
            flexDirection='column'>
            <Grid
              item
              container
              flexDirection='column'
              alignItems='center'
              wrap='nowrap'
              spacing={2}>
              {isCurrentBook && (
                <Grid
                  item
                  container
                  justifyContent='center'
                  alignItems='center'
                  spacing={1}>
                  <Grid item>
                    <MenuBookIcon sx={{ fontSize: '3em' }} color='primary' />
                  </Grid>
                  <Grid item>
                    <Typography
                      component='p'
                      variant='subtitle2'
                      align='center'>
                      Currently Reading
                    </Typography>
                  </Grid>
                </Grid>
              )}
              <Grid item>
                <img
                  src={`${book.imageURL.split(/\._\D{2}\d{2}_/).join('')}`}
                  alt={book.title}
                  className={
                    location.pathname.includes('/book/')
                      ? 'book'
                      : 'book book-sm'
                  }
                />
              </Grid>
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
            <Grid item container sx={{ pb: 3 }} wrap='nowrap'>
              <Grid item xs={location.pathname.includes('/book/') ? 12 : 10}>
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
              {!location.pathname.includes('/book/') && (
                <Grid
                  item
                  sx={2}
                  flexDirection='column'
                  alignItem='center'
                  justifyContent='center'>
                  {user && edit && (
                    <Grid item textAlign='center'>
                      <Tooltip title='Edit Status'>
                        <Fab
                          size='small'
                          color='primary'
                          aria-label='edit'
                          onClick={handleOpenStatusModel}>
                          <EditIcon />
                        </Fab>
                      </Tooltip>
                    </Grid>
                  )}
                  <Grid item>
                    <Typography
                      component='p'
                      variant='subtitle2'
                      align='center'>
                      {status}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    container
                    justifyContent='center'
                    alignItems='center'>
                    {status === 'Not Started' && (
                      <BookmarkBorderIcon
                        sx={{ fontSize: '3em' }}
                        color='primary'
                      />
                    )}

                    {status === 'In Progress' && (
                      <BookmarkIcon sx={{ fontSize: '3em' }} color='primary' />
                    )}

                    {status === 'Finished' && (
                      <BookmarkAddedIcon
                        sx={{ fontSize: '3em' }}
                        color='primary'
                      />
                    )}
                  </Grid>
                </Grid>
              )}
            </Grid>

            <Grid
              item
              container
              sx={{ pb: 3 }}
              spacing={2}
              flexDirection='column'>
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
                  <Typography
                    component='p'
                    variant='subtitle2'
                    className='genre'>
                    {genre}
                  </Typography>
                </Grid>
              ))}
            </Grid>
            {location.pathname.includes('/book/') && user && (
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
        </>
      )}
    </Grid>
  )
}

export default BookOverview
