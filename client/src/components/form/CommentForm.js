import * as React from 'react'
import {
  TextField,
  Grid,
  Alert,
  Stack,
  Button,
  Tooltip,
  IconButton,
} from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import CancelIcon from '@mui/icons-material/Cancel'

const CommentForm = ({
  guideQuestionId,
  userId,
  setComments,
  handleCloseCommentForm,
}) => {
  const [newComment, setNewComment] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [errors, setErrors] = React.useState([])

  //   React.useEffect(() => {
  //     if (comment) {
  //       setNewComment(comment.comment)
  //     }
  //   }, [comment])

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors([])
    setLoading(true)

    handleCloseCommentForm()

    fetch(`/api/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        guide_question_id: guideQuestionId,
        comment: newComment,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false)
        setComments((prevComments) => [...prevComments, data])
        handleCloseCommentForm()
      })
      .catch((err) => {
        setLoading(false)
        setErrors(err.errors || [err.error])
      })
  }

  return (
    <Grid container flexDirection='column'>
      <Grid item alignSelf='flex-end' sx={{ mb: -2 }}>
        <Tooltip title='exit comment'>
          <IconButton
            onClick={handleCloseCommentForm}
            aria-label='exit comment'
            size='large'
            color='error'>
            <CancelIcon />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item>
        <form onSubmit={handleSubmit} className='form'>
          <Grid container flexDirection='column'>
            <Grid item>
              <TextField
                onChange={(e) => setNewComment(e.target.value)}
                value={newComment}
                label='Comment'
                placeholder='write a comment'
                variant='filled'
                fullWidth
                multiline
                rows={3}
              />
            </Grid>
            <Grid item alignSelf='flex-end'>
              <Button
                endIcon={<ArrowForwardIosIcon />}
                type='submit'
                variant='text'
                className='b-radius btn'
                color='primary'>
                Add Comment
              </Button>
            </Grid>
          </Grid>
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
              Creating Comment ... Do Not Refresh Page
            </Alert>
          )}
        </Stack>
      </Grid>
    </Grid>
  )
}

export default CommentForm
