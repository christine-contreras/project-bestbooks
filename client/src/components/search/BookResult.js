import React from 'react'
import '../../css/Book.css'
import { useNavigate } from 'react-router'
import { Typography, Grid, Button } from '@mui/material'

const BookResult = ({ book, handleFetchBook }) => {
  let navigate = useNavigate()

  const handleButtonClick = () => {
    handleFetchBook(book.id)
    navigate(`/book/${book.id}`)
  }

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
            onClick={handleButtonClick}
            variant='outlined'
            color='primary'
            className='b-radius'>
            View Book
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default BookResult
