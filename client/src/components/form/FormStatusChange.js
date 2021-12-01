import * as React from 'react'
import '../../css/Form.css'
import {
  Button,
  TextField,
  Alert,
  Stack,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Tooltip,
  Typography,
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import PersonOffIcon from '@mui/icons-material/PersonOff'
import { useNavigate } from 'react-router-dom'

const FormStatusChange = ({ currentBook, setStatus }) => {
  let navigate = useNavigate()
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
          <Alert severity='error' key={error}>
            {error}
          </Alert>
        ))}
        {loading && (
          <Alert severity='info'>Updating... Do Not Refresh Page</Alert>
        )}

        {updated && <Alert severity='success'>Status Updated</Alert>}
      </Stack>
    </form>
  )
}

export default FormStatusChange
