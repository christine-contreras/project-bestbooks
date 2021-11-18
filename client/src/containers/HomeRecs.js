import * as React from 'react'
import { Grid, Typography } from '@mui/material'
const apiKey = process.env.REACT_APP_API_BOOKS

const HomeRecs = ({ user }) => {
  React.useEffect(() => {
    fetch('https://goodreads-books.p.rapidapi.com/lists?page=1', {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'goodreads-books.p.rapidapi.com',
        'x-rapidapi-key': apiKey,
      },
    })
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return (
    <Grid container direction='column' className='padding-top'>
      <Typography component='h2' variant='h4' align='center' paddingTop>
        Recommended Books
      </Typography>
      <Grid container item spacing={3}></Grid>
    </Grid>
  )
}

export default HomeRecs
