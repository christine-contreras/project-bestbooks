import * as React from 'react'
import '../../css/Form.css'
import {
  Button,
  TextField,
  Alert,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'

const FormBookClub = ({ bookclub }) => {
  const [name, setName] = React.useState(bookclub.name)
  const [errors, setErrors] = React.useState([])
  const [updated, setUpdated] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors([])
    setLoading(true)
    setUpdated(false)

    fetch(`/api/bookclubs/${bookclub.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name,
      }),
    }).then((response) => {
      setLoading(false)
      if (response.ok) {
        response.json().then(() => {
          setUpdated(true)
          // handleCheckLogin()
        })
      } else {
        response.json().then((err) => setErrors(err.errors))
      }
    })
  }

  const handlePasswordChangeClick = () => {
    setTogglePassword((prevToggle) => !prevToggle)
  }

  return (
    <form onSubmit={handleSubmit} className='form'>
      <TextField
        onChange={(e) => setName(e.target.value)}
        value={name}
        label='Name'
        variant='outlined'
        fullWidth
      />

      {/* <FormControl>
        <InputLabel id='profile-colors'>Profile Color</InputLabel>
        <Select
          labelId='profile-colors'
          onChange={(e) => setColor(e.target.value)}
          value={color}>
          {colors.map((color) => (
            <MenuItem value={color.value} key={color.name} sx={{ pt: 3 }}>
              {color.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}

      <Button
        type='submit'
        variant='contained'
        className='b-radius btn btn-lg'
        color='primary'>
        Save Book Club
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

        {updated && <Alert severity='success'>Profile Updated</Alert>}
      </Stack>
    </form>
  )
}

export default FormBookClub
