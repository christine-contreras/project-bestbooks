import * as React from 'react'
import { Grid, Typography, Button } from '@mui/material'
import Question from '../../components/book/Question'
import QuestionModal from '../../components/form/QuestionModal'

const GuideQuestions = ({
  setGuideQuestions,
  edit,
  guideQuestions,
  bookClubBookId,
  isMember,
  user,
}) => {
  //handle create question modal
  const [openQuestionModal, setOpenQuestionModal] = React.useState(false)
  const handleOpenQuestionModel = () => setOpenQuestionModal(true)
  const handleCloseQuestionModel = () => setOpenQuestionModal(false)

  const handleDeleteQuestion = (questionId) => {
    fetch(`/api/guide_questions/${questionId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        console.log(response)
        if (response.ok) {
          const newQuestionList = guideQuestions.filter(
            (g) => g.id !== questionId
          )
          setGuideQuestions(newQuestionList)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <Grid item container flexDirection='column' spacing={4} sx={{ pb: 4 }}>
      <Grid item>
        <Typography component='h1' variant='h4' align='center' paddingBottom>
          Guide Questions
        </Typography>
      </Grid>
      {guideQuestions.length === 0 ? (
        <Grid item>
          <Typography component='p' variant='subtitle1' align='center'>
            No Guide Questions
          </Typography>
        </Grid>
      ) : (
        <Grid item container flexDirection='column' spacing={4}>
          {guideQuestions
            .sort((a, b) => a.chapter - b.chapter)
            .map((question) => {
              return (
                <Question
                  key={`question-${question.id}`}
                  guideQuestion={question}
                  guideQuestions={guideQuestions}
                  edit={edit}
                  isMember={isMember}
                  bookClubBookId={bookClubBookId}
                  setGuideQuestions={setGuideQuestions}
                  handleDeleteQuestion={handleDeleteQuestion}
                  user={user}
                />
              )
            })}
        </Grid>
      )}
      {user && edit && (
        <Grid item textAlign='center'>
          <Button
            onClick={handleOpenQuestionModel}
            variant='contained'
            className='b-radius btn btn-lg'
            color='primary'>
            Add A New Question
          </Button>
        </Grid>
      )}

      <QuestionModal
        openQuestionModal={openQuestionModal}
        handleCloseQuestionModel={handleCloseQuestionModel}
        setGuideQuestions={setGuideQuestions}
        bookClubBookId={bookClubBookId}
        isNew={true}
      />
    </Grid>
  )
}

export default GuideQuestions
