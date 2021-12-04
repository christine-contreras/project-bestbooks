import * as React from 'react'
import { Grid, Button } from '@mui/material'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import Comment from '../../components/book/Comment'
import CommentForm from '../../components/form/CommentForm'

const Comments = ({
  comments,
  isMember,
  guideQuestionId,
  user,
  edit,
  setComments,
}) => {
  const [addCommentForm, setAddCommentForm] = React.useState(false)
  const handleOpenCommentForm = () => setAddCommentForm(true)
  const handleCloseCommentForm = () => setAddCommentForm(false)

  const handleDeleteComment = (commentId) => {
    fetch(`/api/comments/${commentId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        console.log(response)
        if (response.ok) {
          const newCommentsList = comments.filter((c) => c.id !== commentId)
          setComments(newCommentsList)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
  return (
    <>
      {comments.length !== 0 && (
        <Grid item container flexDirection='column' spacing={3}>
          {comments.map((comment) => (
            <Comment
              key={`comment-${comment.id}`}
              comment={comment}
              edit={edit}
              user={user}
              handleDeleteComment={handleDeleteComment}
            />
          ))}
        </Grid>
      )}

      {user && addCommentForm && (
        <CommentForm
          guideQuestionId={guideQuestionId}
          userId={user.id}
          setComments={setComments}
          handleCloseCommentForm={handleCloseCommentForm}
        />
      )}

      {isMember && (
        <Grid item sx={{ pt: 2 }} alignSelf='flex-start'>
          <Button
            variant='text'
            className='b-radius btn'
            color='inherit'
            startIcon={<ChatBubbleOutlineIcon />}
            onClick={handleOpenCommentForm}>
            Comment
          </Button>
        </Grid>
      )}
    </>
  )
}

export default Comments
