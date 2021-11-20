import * as React from 'react'
import { Grid, TextField, Button, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const SearchBar = ({ handleBookSearch }) => {
  const [search, setSearch] = React.useState(null)

  const handleSearch = (e) => {
    e.preventDefault()
    handleBookSearch(search)
  }

  return (
    <Grid
      item
      container
      sx={{ pt: 4 }}
      justifyContent='center'
      alignItems='stretch'>
      <form className='form-search' onSubmit={handleSearch}>
        <TextField
          className='search-bar'
          variant='outlined'
          color='primary'
          placeholder='search books by title or author'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <Button
          type='submit'
          variant='contained'
          className='b-radius btn'
          color='primary'>
          Search
        </Button>
      </form>
    </Grid>
  )
}

export default SearchBar
