import React from 'react'
import { Grid, TextField, Button, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const SearchBar = () => {
  return (
    <Grid
      item
      container
      sx={{ pt: 4 }}
      justifyContent='center'
      alignItems='stretch'>
      <form className='form-search'>
        <TextField
          className='search-bar'
          variant='outlined'
          color='secondary'
          placeholder='search books by title or author'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          // value={search}
          // onChange={(event) => setSearch(event.target.value)}
        />
        <Button
          type='submit'
          variant='contained'
          className='b-radius btn'
          color='secondary'>
          Search
        </Button>
      </form>
    </Grid>
  )
}

export default SearchBar
