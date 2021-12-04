import * as React from 'react'
import '../../css/Form.css'
import Loading from '../../components/Loading'
import SearchBar from '../../components/search/SearchBar'
import BookResult from '../../components/search/BookResult'
import { Grid, Paper, Typography } from '@mui/material'

const BookResults = ({ handleBookSearch, handleFetchBook, books, loading }) => {
  return (
    <Paper elevation={0} sx={{ p: 4 }}>
      <Grid container flexDirection='column'>
        <Typography component='h1' variant='h3' align='center'>
          What Will You Read Next?
        </Typography>

        <Grid
          container
          item
          flexDirection='column'
          className='search-container'
          alignItems='center'>
          <SearchBar handleBookSearch={handleBookSearch} />

          <Grid
            container
            item
            spacing={5}
            sx={{ pt: 6 }}
            alignItems='center'
            justifyContent='center'>
            {loading ? (
              <Loading />
            ) : (
              books &&
              books.map((book) => (
                <BookResult
                  key={book.id}
                  book={book}
                  handleFetchBook={handleFetchBook}
                />
              ))
            )}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default BookResults
