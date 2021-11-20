import * as React from 'react'
import '../css/Form.css'
import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import BookResult from '../components/search/BookResult'

const ListResults = ({
  recommendationLists,
  handleListSearch,
  currentList,
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
    <Grid item container flexDirection='column' spacing={4}>
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

      <Grid container item spacing={5} sx={{ pt: 6 }}>
        {books &&
          books
            .sort((a, b) => a.rankingPosition - b.rankingPosition)
            .map((book) => <BookResult key={book.id} book={book} />)}
      </Grid>
    </Grid>
  )
}

export default ListResults
