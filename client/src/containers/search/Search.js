import * as React from 'react'
import { Grid } from '@mui/material'
import ListResults from './ListResults'
import BookResults from './BookResults'
//dummy data
// import { list } from '../../helpers/list'

const Search = ({
  recommendationLists,
  currentList,
  handleListSearch,
  bookResults,
  handleBookSearch,
  handleFetchBook,
  loading,
}) => {
  return (
    <Grid container maxWidth='xl' spacing={6}>
      <Grid item sx={{ width: '100%' }}>
        <BookResults
          books={bookResults}
          handleBookSearch={handleBookSearch}
          handleFetchBook={handleFetchBook}
          loading={loading}
        />
      </Grid>

      {recommendationLists && (
        <ListResults
          currentList={currentList}
          recommendationLists={recommendationLists}
          handleListSearch={handleListSearch}
          handleFetchBook={handleFetchBook}
          loading={loading}
        />
      )}
    </Grid>
  )
}

export default Search
