import * as React from 'react'
import { changeDate } from '../../helpers/helpers'
import {
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab'
import { Grid, Typography, Button, Fab, Tooltip } from '@mui/material'
import ArticleIcon from '@mui/icons-material/Article'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'

import GoalModal from '../form/GoalModal'

const Goal = ({
  goal,
  isAdmin,
  bookClubBookId,
  setGoals,
  goalNumber,
  goals,
  deleteGoal,
}) => {
  const { deadline, complete, meetingURL, notes, pages } = goal
  const formattedDate = changeDate(deadline)

  //handle modal
  const [openModal, setOpenModal] = React.useState(false)
  const handleOpenModel = () => setOpenModal(true)
  const handleCloseModel = () => setOpenModal(false)

  return (
    <TimelineItem>
      <TimelineOppositeContent sx={{ flex: 0 }}>
        <Grid
          container
          spacing={1}
          flexDirection='column'
          justifyContent='flex-end'
          alignItem='center'>
          <Grid item xs='auto'>
            <Typography
              component='p'
              variant='subtitle1'
              sx={{ fontWeight: 'bold' }}>
              Goal {goalNumber + 1}
            </Typography>
          </Grid>
          {isAdmin && (
            <Grid item xs='auto'>
              <Button
                onClick={() => deleteGoal(goal.id)}
                variant='text'
                className='b-radius'
                color='error'
                startIcon={<ClearIcon />}>
                Delete
              </Button>
            </Grid>
          )}
        </Grid>
      </TimelineOppositeContent>
      <TimelineSeparator>
        {complete ? (
          <TimelineDot color='primary'>
            <CheckIcon />
          </TimelineDot>
        ) : (
          <TimelineDot color='grey'>
            <ArticleIcon />
          </TimelineDot>
        )}
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent color='text.secondary'>
        <Grid container spacing={1} flexDirection='column' sx={{ pb: 3 }}>
          <Grid item container justifyContent='space-between'>
            <Grid item sx='auto'>
              <Typography component='p' variant='subtitle2' paddingBottom>
                by: {formattedDate}
              </Typography>
            </Grid>
            {isAdmin && (
              <Grid item sx='auto'>
                <Tooltip title='Edit Goal'>
                  <Fab
                    size='small'
                    color='primary'
                    aria-label='edit'
                    onClick={handleOpenModel}>
                    <EditIcon />
                  </Fab>
                </Tooltip>
              </Grid>
            )}
          </Grid>
          <Grid item>
            <Typography component='p' variant='subtitle2' paddingBottom>
              pages: {`${pages[0]} - ${pages[1]}`}
            </Typography>
          </Grid>
          <Grid item>
            <Typography component='p' paddingBottom>
              notes: {notes}
            </Typography>
          </Grid>
          {meetingURL.length !== 0 && (
            <Grid item>
              {complete ? (
                <Button
                  disabled
                  variant='contained'
                  className='b-radius btn'
                  color='primary'>
                  Join Meeting
                </Button>
              ) : (
                <Button
                  variant='contained'
                  className='b-radius btn'
                  color='primary'
                  href={meetingURL}>
                  Join Meeting
                </Button>
              )}
            </Grid>
          )}
        </Grid>
      </TimelineContent>

      <GoalModal
        openModal={openModal}
        handleCloseModel={handleCloseModel}
        setGoals={setGoals}
        bookClubBookId={bookClubBookId}
        goal={goal}
        goals={goals}
      />
    </TimelineItem>
  )
}

export default Goal
