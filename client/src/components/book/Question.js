import * as React from 'react'
import { Grid, Typography, Button, Fab, Tooltip } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import ClearIcon from '@mui/icons-material/Clear'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import QuestionModal from '../form/QuestionModal'

const Question = ({
  guideQuestion,
  guideQuestions,
  edit,
  setGuideQuestions,
  handleDeleteQuestion,
  bookClubBookId,
}) => {
  //handle edit question modal
  const [openQuestionModal, setOpenQuestionModal] = React.useState(false)
  const handleOpenQuestionModel = () => setOpenQuestionModal(true)
  const handleCloseQuestionModel = () => setOpenQuestionModal(false)

  return (
    <Grid item container wrap='nowrap'>
      <Grid
        item
        container
        xs={3}
        lg={2}
        flexDirection='column'
        alignItems='center'
        justifyContent='flex-start'>
        <Grid item>
          <Typography component='p' variant='subtitle2'>
            Chapter {guideQuestion.chapter}
          </Typography>
        </Grid>
        <Grid item>
          <BookmarkIcon sx={{ fontSize: '3em' }} color='primary' />
        </Grid>
      </Grid>
      <Grid item container xs={9} lg={12} alignItems='center'>
        <Grid item xs={12} lg={10}>
          <Typography component='p' paddingBottom>
            {guideQuestion.question}
          </Typography>
        </Grid>
        {edit && (
          <Grid
            item
            container
            xs={12}
            lg={2}
            spacing={2}
            wrap='nowrap'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'>
            <Grid item xs={12}>
              <Tooltip title='Edit Goal'>
                <Fab
                  size='small'
                  color='primary'
                  aria-label='edit'
                  onClick={handleOpenQuestionModel}>
                  <EditIcon />
                </Fab>
              </Tooltip>
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={() => handleDeleteQuestion(guideQuestion.id)}
                variant='text'
                className='b-radius'
                color='error'
                startIcon={<ClearIcon />}>
                Delete
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>

      <QuestionModal
        openQuestionModal={openQuestionModal}
        handleCloseQuestionModel={handleCloseQuestionModel}
        setGuideQuestions={setGuideQuestions}
        bookClubBookId={bookClubBookId}
        isNew={false}
        guideQuestions={guideQuestions}
        guideQuestion={guideQuestion}
      />
    </Grid>
  )
}

export default Question
