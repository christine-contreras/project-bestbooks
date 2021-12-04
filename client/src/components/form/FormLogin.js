import * as React from 'react'
import { Button, TextField, Alert, Stack } from '@mui/material'
import { useNavigate } from 'react-router'

const FormLogin = ({ onLogin }) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [errors, setErrors] = React.useState([])

  let navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors([])
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        email,
      }),
    }).then((response) => {
      if (response.ok) {
        response
          .json()
          .then((user) => onLogin(user))
          .then(navigate('/'))
      } else {
        response.json().then((err) => setErrors(err.errors))
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className='form'>
      <TextField
        required
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        label='Email'
        variant='outlined'
        fullWidth
      />

      <TextField
        required
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        label='Password'
        variant='outlined'
        type='password'
        fullWidth
      />

      <Button
        type='submit'
        variant='contained'
        className='b-radius btn btn-lg'
        color='primary'>
        Sign In
      </Button>

      <Stack sx={{ width: '100%' }} spacing={2} className='padding-top'>
        {errors.map((error) => (
          <Alert severity='error' variant='filled' key={error}>
            {error}
          </Alert>
        ))}
      </Stack>
    </form>
  )
}

export default FormLogin
