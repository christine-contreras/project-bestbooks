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

const FormBookClub = ({ bookclub, setCurrentBookclub, fetchUser }) => {
  let navigate = useNavigate()
  const [name, setName] = React.useState(bookclub ? bookclub.name : '')
  const [adminId, setAdminId] = React.useState(
    bookclub ? bookclub.admin.id : null
  )
  const [currentUsers, setCurrentUsers] = React.useState(
    bookclub ? bookclub.users : []
  )
  const [deleteUsers, setDeleteUsers] = React.useState([])
  const [allUsers, setAllUsers] = React.useState([])

  const [newUsers, setNewUsers] = React.useState([])
  const [errors, setErrors] = React.useState([])
  const [updated, setUpdated] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setName(bookclub ? bookclub.name : '')
    setAdminId(bookclub ? bookclub.admin.id : null)
    setCurrentUsers(bookclub ? bookclub.users : [])

    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => setAllUsers(data))
      .catch((err) => {
        console.error(err)
      })
  }, [bookclub])

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors([])
    setLoading(true)
    setUpdated(false)

    const deleteUserIds = deleteUsers ? deleteUsers.map((user) => user.id) : []
    const addUserIds = newUsers ? newUsers.map((user) => user.id) : []

    fetch(`/api/bookclubs/${bookclub.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name,
        admin_id: adminId,
        delete_users: deleteUserIds,
        add_users: addUserIds,
      }),
    }).then((response) => {
      setLoading(false)
      setDeleteUsers([])
      setNewUsers([])
      if (response.ok) {
        setUpdated(true)
        response.json().then((data) => {
          setCurrentBookclub(data)
          fetchUser()
        })
      } else {
        response.json().then((err) => {
          if (err.exception) {
            fetchUser()
            navigate('/profile/my-bookclubs')
          } else {
            setErrors(err)
          }
        })
      }
    })
  }

  const handleDeleteCurrentMemberClick = (user) => {
    setDeleteUsers((prevUsers) => [...prevUsers, user])
  }

  const handleAddCurrentMemberClick = (user) => {
    const newDeltedUsers = deleteUsers.filter((u) => u.id !== user.id)
    setDeleteUsers(newDeltedUsers)
  }

  let filteredOptions = () => {
    const currentUserIds = currentUsers
      ? currentUsers.map((user) => user.id)
      : []

    const allUserIds = allUsers ? allUsers.map((user) => user.id) : []

    const filteredIds = allUserIds.filter((id) => currentUserIds.includes(id))

    const filteredUsers =
      filteredIds.length === 0
        ? []
        : allUsers.filter((user) => !filteredIds.includes(user.id))
    return filteredUsers
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

      <FormControl>
        <InputLabel id='bookclub-admin'>Admin</InputLabel>
        <Select
          labelId='bookclub-admin'
          onChange={(e) => setAdminId(e.target.value)}
          value={adminId}>
          {currentUsers.map((user) => (
            <MenuItem value={user.id} key={`user-${user.id}`} sx={{ pt: 3 }}>
              {user.full_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Autocomplete
        multiple
        id='members-outlined'
        options={filteredOptions()}
        getOptionLabel={(option) => option.full_name}
        value={newUsers}
        onChange={(e, value) => {
          setNewUsers(value)
        }}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label='Add Members'
            placeholder='Add Members'
          />
        )}
      />

      <Grid container spacing={3} flexDirection='column' sx={{ p: 4 }}>
        <Grid item>
          <Typography component='p' variant='subtitle1'>
            Current Members
          </Typography>
        </Grid>
        <Grid
          item
          container
          spacing={1}
          alignItems='center'
          justifyContent='center'>
          {currentUsers.map((user) => (
            <Grid item key={`user-profile-${user.id}`}>
              {bookclub.admin.id === user.id ? (
                <Tooltip title='cannot remove admin'>
                  <Button
                    variant='contained'
                    color='primary'
                    disabled
                    startIcon={<PersonIcon />}>
                    {user.full_name}
                  </Button>
                </Tooltip>
              ) : deleteUsers.find((u) => u.id === user.id) ? (
                <Tooltip title='add member'>
                  <Button
                    onClick={() => handleAddCurrentMemberClick(user)}
                    variant='contained'
                    color='error'
                    startIcon={<PersonOffIcon />}>
                    {user.full_name}
                  </Button>
                </Tooltip>
              ) : (
                <Tooltip title='remove member'>
                  <Button
                    onClick={() => handleDeleteCurrentMemberClick(user)}
                    variant='contained'
                    color='secondary'
                    startIcon={<PersonIcon />}>
                    {user.full_name}
                  </Button>
                </Tooltip>
              )}
            </Grid>
          ))}
        </Grid>
      </Grid>

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

export default FormBookClub
