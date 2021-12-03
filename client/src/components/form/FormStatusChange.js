import * as React from 'react'
import '../../css/Form.css'
import {
  Button,
  Alert,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  Grid,
  FormControlLabel,
  Switch,
} from '@mui/material'

const FormStatusChange = ({
  currentBook,
  setStatus,
  setCurrentBook,
  bookClubId,
  handleOpenSuccessDeleteMessage,
  handleFetchBookClub,
}) => {
  const [newStatus, setNewStatus] = React.useState('Not Started')
  const [complete, setComplete] = React.useState(false)
  const [errors, setErrors] = React.useState([])
  const [updated, setUpdated] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setNewStatus(currentBook ? currentBook.status : 'Not Started')
  }, [currentBook])

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors([])
    setLoading(true)
    setUpdated(false)

    let updates

    if (complete) {
      updates = {
        status: newStatus,
        current: false,
        archived: true,
      }
    } else {
      updates = {
        status: newStatus,
      }
    }

    fetch(`/api/bookclub_books/${currentBook.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(updates),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false)
        setUpdated(true)
        if (complete) {
          setCurrentBook(null)
          handleOpenSuccessDeleteMessage()
          setTimeout(() => {
            handleFetchBookClub(bookClubId)
          }, 3000)
        } else {
          setStatus(data.status)
        }
      })
      .catch((err) => {
        setLoading(false)
        setErrors(err.errors || [err.error])
      })
  }

  const statusOption = ['Not Started', 'In Progress', 'Finished']

  return (
    <form onSubmit={handleSubmit} className='form'>
      <Grid container justifyContent='flex-end'>
        <Grid item>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={complete}
                  color='primary'
                  onChange={(e) => setComplete(e.target.checked)}
                />
              }
              label='Completed'
            />
          </FormGroup>
        </Grid>
      </Grid>

      <FormControl className='form-lists'>
        <InputLabel id='status-options'>Status</InputLabel>
        <Select
          labelId='status-options'
          onChange={(e) => setNewStatus(e.target.value)}
          value={newStatus}>
          {statusOption.map((status) => (
            <MenuItem value={status} key={`status-option-${status}`}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        type='submit'
        variant='contained'
        className='b-radius btn btn-lg'
        color='primary'>
        Save Status
      </Button>

      <Stack
        sx={{ width: '70%', margin: 'auto' }}
        spacing={2}
        className='padding-top'>
        {errors.map((error) => (
          <Alert severity='error' variant='filled' key={error}>
            {error}
          </Alert>
        ))}
        {loading && (
          <Alert severity='info' variant='filled'>
            Updating... Do Not Refresh Page
          </Alert>
        )}

        {updated && (
          <Alert severity='success' variant='filled'>
            Status Updated
          </Alert>
        )}
      </Stack>
    </form>
  )
}

export default FormStatusChange
