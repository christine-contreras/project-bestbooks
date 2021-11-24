import React from 'react'
import { Typography, Grid, Card, CardContent, CardActions } from '@mui/material'

const Bookclub = ({ bookclub }) => {
  return (
    <Grid item xs={12} sm={6} lg={4} alignSelf='stretch'>
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Typography component='h3' variant='h5' align='center' paddingTop>
            {bookclub.name}
          </Typography>
          <Typography component='p' variant='subtitle2' align='left' paddingTop>
            {bookclub.users.length}{' '}
            {bookclub.users.length == 1 ? 'member' : 'members'}
          </Typography>

          <Typography component='p' variant='subtitle2' align='left' paddingTop>
            Admin: {`${bookclub.admin.first_name} ${bookclub.admin.last_name}`}
          </Typography>

          <Typography component='p' variant='subtitle2' align='left' paddingTop>
            Currently Reading: Harry Potter
          </Typography>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </Grid>
  )
}

export default Bookclub
