import React from 'react'
import { Grid, Typography, Button } from '@mui/material'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'
import BookOverview from '../../components/book/BookOverview'

const WishlistBook = ({ book, recommender, status, adminId, user }) => {
  return (
    <Grid item container spacing={2} flexDirection='column' wrap='nowrap'>
      <Grid item container xs={12} lg={4} justifyContent='center'>
        <Typography component='p' variant='subtitle2' align='center'>
          Suggested By: {recommender}
        </Typography>
      </Grid>
      <Grid item>
        <BookOverview book={book} />
      </Grid>
      <Grid
        item
        container
        flexDirection='column'
        spacing={2}
        xs={12}
        lg={4}
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
    </Grid>
  )
}

export default WishlistBook
