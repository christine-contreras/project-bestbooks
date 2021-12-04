import * as React from 'react'
import {
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Input,
  Grid,
  Alert,
  Stack,
  Button,
} from '@mui/material'

const FormQuestion = ({
  handleCloseModel,
  bookClubBookId,
  setGuideQuestions,
  guideQuestions,
  guideQuestion,
  isNew,
}) => {
  const [chapter, setChapter] = React.useState(1)
  const [question, setQuestion] = React.useState('')

  const [loading, setLoading] = React.useState(false)
  const [updated, setUpdated] = React.useState(false)
  const [errors, setErrors] = React.useState([])

  React.useEffect(() => {
    if (!isNew && guideQuestion) {
      setChapter(guideQuestion.chapter)
      setQuestion(guideQuestion.question)
    }
  }, [guideQuestion])

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors([])
    setLoading(true)
    setUpdated(false)

    const updatedQuestion = {
      bookclub_book_id: bookClubBookId,
      chapter,
      question,
    }

    if (guideQuestion) {
      updateQuestion(updatedQuestion)
    } else {
      createQuestion(updatedQuestion)
    }
  }

  const createQuestion = (updatedQuestion) => {
    fetch('/api/guide_questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedQuestion),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false)
        setGuideQuestions((prevQuestions) => [...prevQuestions, data])
        handleCloseModel()
      })
      .catch((err) => {
        setLoading(false)
        setErrors(err.errors || [err.error])
      })
  }

  const updateQuestion = (updatedQuestion) => {
    fetch(`/api/guide_questions/${guideQuestion.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(updatedQuestion),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false)
        const newQuestionList = guideQuestions.map((q) =>
          q.id === data.id ? data : q
        )
        setGuideQuestions(newQuestionList)
        setUpdated(true)
      })
      .catch((err) => {
        setLoading(false)
        setErrors(err.errors || [err.error])
      })
  }

  return (
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
          {isNew ? 'Create Guide Question' : 'Edit Question'}
        </Typography>
      </Grid>

      <Grid item>
        <form onSubmit={handleSubmit} className='form'>
          <FormControl>
            <InputLabel htmlFor='page-end'>Question Is For Chapter:</InputLabel>
            <Input
              required
              id='page-end'
              aria-describedby='my-helper-text'
              type='number'
              value={chapter}
              onChange={(e) => setChapter(parseInt(e.target.value))}
              inputProps={{ min: '1' }}
            />
          </FormControl>

          <TextField
            required
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
            label='Question'
            variant='outlined'
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
      </Grid>
      <Grid item>
        <Stack sx={{ width: '100%' }} spacing={2} className='padding-top'>
          {errors.map((error) => (
            <Alert severity='error' variant='filled' key={error}>
              {error}
            </Alert>
          ))}
          {loading && (
            <Alert severity='info' variant='filled'>
              {isNew ? 'Creating' : 'Updating'} Question... Do Not Refresh Page
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
  )
}

export default FormQuestion
