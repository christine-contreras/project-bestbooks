import * as React from 'react'
import { Outlet } from 'react-router-dom'
import { Typography, Grid, Paper, Container } from '@mui/material'
import ListResults from './ListResults'
import BookResults from './BookResults'
//dummy data
import { list } from '../helpers/list'

const Search = ({
  recommendationLists,
  currentList,
  handleListSearch,
  bookResults,
  handleBookSearch,
  handleFetchBook,
}) => {
  return (
    <Grid container maxWidth='xl' spacing={6}>
      <Grid item sx={{ width: '100%' }}>
        <BookResults
          books={bookResults}
          handleBookSearch={handleBookSearch}
          handleFetchBook={handleFetchBook}
        />
      </Grid>

      {recommendationLists && (
        <ListResults
          currentList={currentList}
          recommendationLists={recommendationLists}
          handleListSearch={handleListSearch}
          handleFetchBook={handleFetchBook}
        />
      )}
      {/* <Grid container item>
        <Outlet />
      </Grid> */}
    </Grid>
  )
}

export default Search
