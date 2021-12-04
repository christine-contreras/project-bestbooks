import * as React from 'react'
import '../../css/Form.css'
import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import ListResult from '../../components/search/ListResult'
import Loading from '../../components/Loading'

const ListResults = ({
  recommendationLists,
  handleListSearch,
  currentList,
  handleFetchBook,
  loading,
}) => {
  const [listValue, setListValue] = React.useState(
    currentList ? currentList.id : null
  )
  const [books, setBooks] = React.useState(
    currentList ? currentList.list.items : null
  )

  React.useEffect(() => {
    setListValue(currentList ? currentList.id : null)
    setBooks(currentList ? currentList.list.items : null)
  }, [currentList])

  const handleListChange = (e) => {
    setListValue(e.target.value)
    handleListSearch(e.target.value)
  }
  return (
    <Grid item container flexDirection='column' wrap='nowrap' spacing={4}>
      <Grid item>
        <Typography component='h2' variant='h4' align='center'>
          Search Books By Popular Lists
        </Typography>
      </Grid>
      <Grid item xs={12} textAlign='center'>
        <FormControl className='form-lists'>
          <InputLabel id='list-recommendations'>Lists</InputLabel>
          <Select
            labelId='list-recommendations'
            onChange={handleListChange}
            value={listValue}>
            {recommendationLists.map((rec) => (
              <MenuItem value={rec.id}>{rec.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

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
          books
            .sort((a, b) => a.rankingPosition - b.rankingPosition)
            .map((book) => (
              <ListResult
                key={book.id}
                book={book}
                handleFetchBook={handleFetchBook}
              />
            ))
        )}
      </Grid>
    </Grid>
  )
}

export default ListResults
