import React from 'react'
import '../../css/Bookclub.css'
import {
  Typography,
  Grid,
  Avatar,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useNavigate } from 'react-router-dom'

const BookclubCard = ({ bookclub, user }) => {
  let navigate = useNavigate()
  return (
    <Grid item xs={12} sm={6} lg={4} alignSelf='stretch'>
      <Card className='bookclub-card'>
        <CardContent>
          <Grid container spacing={2} alignItems='center' wrap='nowrap'>
            {user.id === bookclub.admin.id ? (
              <Grid item>
                <Avatar
                  sx={{
                    bgcolor: 'primary.main',
                    width: 56,
                    height: 56,
                    fontSize: '.8em',
                  }}>
                  Owner
                </Avatar>
              </Grid>
            ) : null}
            <Grid item>
              <Typography component='h3' variant='h6' align='left' paddingTop>
                {bookclub.name}
              </Typography>
            </Grid>
          </Grid>
          <Typography component='p' variant='subtitle2' align='left' paddingTop>
            {bookclub.users.length}{' '}
            {bookclub.users.length == 1 ? 'member' : 'members'}
          </Typography>

          <Typography component='p' variant='subtitle2' align='left' paddingTop>
            {/* update */}
            Currently Reading: Harry Potter
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => navigate(`/bookclub/${bookclub.id}`)}
            endIcon={<ArrowForwardIosIcon />}>
            View Club
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default BookclubCard
