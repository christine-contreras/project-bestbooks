import * as React from 'react'
import { Modal } from '@mui/material'
import FormGoal from './FormGoal'

const GoalModal = ({
  openModal,
  handleCloseModel,
  pagecount,
  bookClubBookId,
  setGoals,
  goal,
  goals,
  newGoal,
}) => {
  return (
    <Modal
      className='modal'
      open={openModal}
      onClose={handleCloseModel}
      aria-labelledby='modal-create-bookclub-modal'
      aria-describedby='modal-create-bookclub-modal'>
      <FormGoal
        handleCloseModel={handleCloseModel}
        pagecount={pagecount}
        setGoals={setGoals}
        goals={goals}
        goal={goal}
        newGoal={newGoal}
        bookClubBookId={bookClubBookId}
      />
    </Modal>
  )
}

export default GoalModal
