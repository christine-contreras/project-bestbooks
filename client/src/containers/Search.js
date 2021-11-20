import * as React from 'react'
import { Outlet } from 'react-router-dom'
import { Typography, Grid, Paper, Container } from '@mui/material'
import ListResults from './ListResults'
import BookResults from './BookResults'
//dummy data
import { list } from '../helpers/list'

const Search = ({ recommendationLists, currentList, handleListSearch }) => {
  return (
    <Grid container maxWidth='xl' spacing={6}>
      <Grid item sx={{ width: '100%' }}>
        <BookResults />
      </Grid>

      {!recommendationLists ? (
        <Typography component='h1' variant='h3' align='center'>
          Loading...
        </Typography>
      ) : (
        <ListResults
          currentList={currentList}
          recommendationLists={recommendationLists}
          handleListSearch={handleListSearch}
        />
      )}
      {/* <Grid container item>
        <Outlet />
      </Grid> */}
    </Grid>
  )
}

export default Search
