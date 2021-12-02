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
} from '@mui/material'

const FormStatusChange = ({ currentBook, setStatus }) => {
  const [newStatus, setNewStatus] = React.useState('Not Started')

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

    fetch(`/api/bookclub_books/${currentBook.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false)
        setUpdated(true)
        setStatus(data.status)
      })
      .catch((err) => {
        setLoading(false)
        setErrors(err.errors || [err.error])
      })
  }

  const statusOption = ['Not Started', 'In Progress', 'Finished']

  return (
    <form onSubmit={handleSubmit} className='form'>
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
