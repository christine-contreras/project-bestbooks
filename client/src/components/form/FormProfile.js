import * as React from 'react'
import '../../css/Form.css'
import { colors } from '../../helpers/colors'
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

const FormProfile = ({ user, handleCheckLogin }) => {
  const [color, setColor] = React.useState(
    user.profile_color ? user.profile_color : '#004d40'
  )
  const [firstName, setFirstName] = React.useState(
    user.first_name ? user.first_name : ''
  )
  const [lastName, setLastName] = React.useState(
    user.last_name ? user.last_name : ''
  )
  const [email, setEmail] = React.useState(user.email ? user.email : '')
  const [password, setPassword] = React.useState('')
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('')
  const [location, setLocation] = React.useState(
    user.location ? user.location : ''
  )
  const [errors, setErrors] = React.useState([])
  const [updated, setUpdated] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [togglePassword, setTogglePassword] = React.useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors([])
    setUpdated(false)
    setLoading(true)

    let updatedUser
    togglePassword
      ? (updatedUser = {
          first_name: firstName,
          last_name: lastName,
          password,
          password_confirmation: passwordConfirmation,
          email,
          location,
          profile_color: color,
        })
      : (updatedUser = {
          first_name: firstName,
          last_name: lastName,
          email,
          location,
          profile_color: color,
        })

    fetch(`/api/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(updatedUser),
    }).then((response) => {
      setLoading(false)
      if (response.ok) {
        response.json().then(() => {
          setUpdated(true)
          handleCheckLogin()
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
      <FormControl>
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
      </FormControl>

      <TextField
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
        label='First Name'
        variant='outlined'
        fullWidth
      />

      <TextField
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
        label='Last Name'
        variant='outlined'
        fullWidth
      />

      <TextField
        onChange={(e) => setLocation(e.target.value)}
        value={location}
        label='Location'
        variant='outlined'
        fullWidth
      />

      <TextField
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        label='Email'
        variant='outlined'
        fullWidth
      />

      <div className={!togglePassword ? 'hidden' : null}>
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          label='Password'
          variant='outlined'
          type='password'
          fullWidth
        />

        <TextField
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          value={passwordConfirmation}
          label='Confirm Password'
          variant='outlined'
          type='password'
          fullWidth
        />
      </div>

      <Button
        variant='text'
        className='b-radius btn btn-lg'
        color='primary'
        onClick={handlePasswordChangeClick}>
        Change Password?
      </Button>

      <Button
        type='submit'
        variant='contained'
        className='b-radius btn btn-lg'
        color='primary'>
        Save Profile
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
            Profile Updated
          </Alert>
        )}
      </Stack>
    </form>
  )
}

export default FormProfile
