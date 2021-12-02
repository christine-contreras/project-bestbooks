import * as React from 'react'
import { Modal } from '@mui/material'
import FormQuestion from './FormQuestion'

const QuestionModal = ({
  openQuestionModal,
  handleCloseQuestionModel,
  bookClubBookId,
  guideQuestions,
  guideQuestion,
  setGuideQuestions,
  isNew,
}) => {
  return (
    <Modal
      className='modal'
      open={openQuestionModal}
      onClose={handleCloseQuestionModel}
      aria-labelledby='modal-create-bookclub-modal'
      aria-describedby='modal-create-bookclub-modal'>
      <FormQuestion
        handleCloseModel={handleCloseQuestionModel}
        guideQuestions={guideQuestions}
        setGuideQuestions={setGuideQuestions}
        isNew={isNew}
        guideQuestion={guideQuestion}
        bookClubBookId={bookClubBookId}
      />
    </Modal>
  )
}

export default QuestionModal
