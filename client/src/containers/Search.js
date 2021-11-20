import * as React from 'react'
import { Outlet } from 'react-router-dom'
import { Typography, Grid, Paper, Container } from '@mui/material'
import ListResults from './ListResults'
//dummy data
import { list } from '../helpers/list'

const Search = ({ recommendationLists, currentList, handleListSearch }) => {
  return (
    <Container maxWidth='xl'>
      <Grid item container flexDirection='column'>
        <Typography component='h1' variant='h3' align='center'>
          What Will You Read Next?
        </Typography>
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
    </Container>
  )
}

export default Search
