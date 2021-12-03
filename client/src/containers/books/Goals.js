import * as React from 'react'
import { parseDate } from '../../helpers/helpers'
import { Grid, Typography, Button } from '@mui/material'
import { Timeline } from '@mui/lab'
import Goal from '../../components/book/Goal'
import GoalModal from '../../components/form/GoalModal'

const Goals = ({ goals, edit, pagecount, bookClubBookId, setGoals, user }) => {
  //handle modal
  const [openModal, setOpenModal] = React.useState(false)
  const handleOpenModel = () => setOpenModal(true)
  const handleCloseModel = () => setOpenModal(false)

  const handleDeleteGoal = (goalId) => {
    fetch(`/api/goals/${goalId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        console.log(response)
        if (response.ok) {
          const newGoalList = goals.filter((g) => g.id !== goalId)
          setGoals(newGoalList)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <Grid item container flexDirection='column' spacing={4}>
      <Grid item>
        <Typography component='h1' variant='h4' align='center' paddingBottom>
          Goals
        </Typography>
      </Grid>
      {goals.length === 0 ? (
        <Grid item>
          <Typography component='p' variant='subtitle1' align='center'>
            No Goals Yet
          </Typography>
        </Grid>
      ) : (
        <Grid item container flexDirection='column'>
          <Timeline sx={{ maxWidth: 860 }}>
            {goals
              .sort((a, b) => parseDate(a.deadline) - parseDate(b.deadline))
              .map((goal, index) => {
                return (
                  <Goal
                    key={`goal-${goal.id}`}
                    goal={goal}
                    goals={goals}
                    goalNumber={index}
                    edit={edit}
                    bookClubBookId={bookClubBookId}
                    setGoals={setGoals}
                    handleDeleteGoal={handleDeleteGoal}
                  />
                )
              })}
          </Timeline>
        </Grid>
      )}
      {user && edit && (
        <Grid item textAlign='center'>
          <Button
            onClick={handleOpenModel}
            variant='contained'
            className='b-radius btn btn-lg'
            color='primary'>
            Add A New Goal
          </Button>
        </Grid>
      )}

      <GoalModal
        openModal={openModal}
        handleCloseModel={handleCloseModel}
        pagecount={pagecount}
        setGoals={setGoals}
        bookClubBookId={bookClubBookId}
        newGoal={true}
      />
    </Grid>
  )
}

export default Goals
