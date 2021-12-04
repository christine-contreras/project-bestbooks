import * as React from 'react'
import { changeDate, changeDateToApiFormat } from '../../helpers/helpers'
import {
  Typography,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Input,
  FormControlLabel,
  Switch,
  Grid,
  Alert,
  Stack,
  Button,
  FormGroup,
} from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'

const FormGoal = ({
  handleCloseModel,
  pagecount,
  bookClubBookId,
  setGoals,
  goal,
  goals,
  newGoal,
}) => {
  const [startPage, setStartPage] = React.useState(1)
  const [endPage, setEndPage] = React.useState(parseInt(pagecount))
  const [date, setDate] = React.useState(Date.now())
  const [meetingURL, setMeetingURL] = React.useState('')
  const [notes, setNotes] = React.useState('')
  const [complete, setComplete] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [updated, setUpdated] = React.useState(false)
  const [errors, setErrors] = React.useState([])

  React.useEffect(() => {
    if (!newGoal && goal) {
      setStartPage(parseInt(goal.pages[0]))
      setEndPage(parseInt(goal.pages[1]))
      setDate(changeDate(goal.deadline))
      setMeetingURL(goal.meetingURL)
      setNotes(goal.notes)
      setComplete(goal.complete)
    }
  }, [goal])

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors([])
    setLoading(true)
    setUpdated(false)

    const newTask = {
      bookclub_book_id: bookClubBookId,
      complete,
      notes,
      meetingURL,
      deadline: changeDateToApiFormat(date),
      pages: [startPage, endPage],
    }

    if (goal) {
      updateGoal(newTask)
    } else {
      createNewGoal(newTask)
    }
  }

  const createNewGoal = (newTask) => {
    fetch('/api/goals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    }).then((response) => {
      setLoading(false)
      if (response.ok) {
        response.json().then((goal) => {
          setGoals((prevGoals) => [...prevGoals, goal])
          handleCloseModel()
        })
      } else {
        response.json().then((err) => {
          setErrors(err.errors || err.error)
        })
      }
    })
  }

  const updateGoal = (newTask) => {
    fetch(`/api/goals/${goal.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false)
        const newGoalList = goals.map((g) => (g.id === data.id ? data : g))
        setGoals(newGoalList)
        setUpdated(true)
      })
      .catch((err) => {
        setLoading(false)
        setErrors(err.errors || [err.error])
      })
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid
        container
        flexDirection='column'
        className='modal-body b-radius-sm'
        sx={{ top: '40%' }}
        spacing={2}>
        <Grid item>
          <Typography
            component='h1'
            variant='h4'
            align='center'
            paddingTop
            paddingBottom>
            {!newGoal ? 'Edit Goal' : 'New Goal'}
          </Typography>
        </Grid>

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

          <Grid container justifyContent='center' alignItems='center'>
            <Grid item xs={12}>
              <FormGroup>
                <InputLabel id='dueDate'>Goal Date</InputLabel>
                <DatePicker
                  value={date}
                  name='dueDate'
                  onChange={(newDate) => {
                    setDate(newDate)
                  }}
                  renderInput={(params) => (
                    <TextField {...params} variant='outlined' required />
                  )}
                />
              </FormGroup>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={6}>
              <FormControl>
                <InputLabel htmlFor='page-start'>Start Page</InputLabel>
                <Input
                  required
                  id='page-start'
                  aria-describedby='my-helper-text'
                  type='number'
                  value={startPage}
                  onChange={(e) => setStartPage(parseInt(e.target.value))}
                  inputProps={{ min: '1', max: pagecount }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <InputLabel htmlFor='page-end'>End Page</InputLabel>
                <Input
                  required
                  id='page-end'
                  aria-describedby='my-helper-text'
                  type='number'
                  value={endPage}
                  onChange={(e) => setEndPage(parseInt(e.target.value))}
                  inputProps={{ min: '1', max: pagecount }}
                />
              </FormControl>
            </Grid>
          </Grid>

          <TextField
            onChange={(e) => setMeetingURL(e.target.value)}
            value={meetingURL}
            label='Meeting URL'
            variant='standard'
            fullWidth
          />

          <TextField
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
            label='Notes'
            variant='standard'
            fullWidth
            multiline
            rows={3}
          />

          <Button
            type='submit'
            variant='contained'
            className='b-radius btn btn-lg'
            color='primary'>
            Submit
          </Button>
        </form>
        <Grid item>
          <Stack sx={{ width: '100%' }} spacing={2} className='padding-top'>
            {errors.map((error) => (
              <Alert severity='error' key={error} variant='filled'>
                {error}
              </Alert>
            ))}
            {loading && (
              <Alert severity='info' variant='filled'>
                {!newGoal ? 'Updating' : 'Creating'} Goal... Do Not Refresh Page
              </Alert>
            )}

            {updated && (
              <Alert severity='success' variant='filled'>
                Goal Updated
              </Alert>
            )}
          </Stack>
        </Grid>
      </Grid>
    </LocalizationProvider>
  )
}

export default FormGoal
