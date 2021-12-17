import * as React from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Tooltip,
  IconButton,
} from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'

const Comment = ({ comment, user, edit, handleDeleteComment }) => {
  const [canDelete, setCanDelete] = React.useState(false)

  React.useEffect(() => {
    if (user) {
      setCanDelete(edit || user.id === comment.user_id)
    } else {
      setCanDelete(false)
    }
  }, [user])

  return (
    <Grid item>
      <Card
        sx={{ borderRadius: 4, backgroundColor: 'rgb(248 244 239 / 60%)' }}
        elevation={4}>
        <CardContent>
          <Grid
            container
            spacing={1}
            alignItems='center'
            justifyContent='space-between'>
            <Grid item>
              <Typography component='p' variant='subtitle2'>
                {comment.username}
              </Typography>
            </Grid>
            {canDelete && (
              <Grid item>
                <Tooltip title='delete comment'>
                  <IconButton
                    onClick={() => handleDeleteComment(comment.id)}
                    aria-label='delete comment'
                    size='large'
                    color='error'>
                    <CancelIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            )}
          </Grid>
          <Typography component='p' variant='p'>
            {comment.comment}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default Comment
