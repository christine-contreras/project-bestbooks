import * as React from 'react'
import Recommendation from '../components/Recommendation'
import { Grid, Typography } from '@mui/material'
import { data } from '../helpers/booksrec'

const apiKey = process.env.REACT_APP_API_BOOKS

const HomeRecs = ({ user }) => {
  const [recommendations, setRecommendations] = React.useState(null)

  React.useEffect(() => {
    // fetch('https://goodreads-books.p.rapidapi.com/lists?page=1', {
    //   method: 'GET',
    //   headers: {
    //     'x-rapidapi-host': 'goodreads-books.p.rapidapi.com',
    //     'x-rapidapi-key': apiKey,
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setRecommendations(data[Math.floor(Math.random() * data.length)])
    //   })
    //   .catch((err) => {
    //     console.error(err)
    //   })

    //fake data
    setRecommendations(data[Math.floor(Math.random() * data.length)])
  }, [])

  return (
    <Grid container direction='column' sx={{ pt: 10 }}>
      <Typography component='h2' variant='h4' align='center' paddingTop>
        Recommended Books
      </Typography>
      {recommendations && (
        <>
          <Typography component='p' variant='subtitle1' align='center'>
            A List Of The {recommendations.name}
          </Typography>
          <Grid container item spacing={3} sx={{ pt: 10 }}>
            {recommendations.preview.slice(0, 4).map((rec) => (
              <Recommendation key={rec.title} book={rec} />
            ))}
          </Grid>
        </>
      )}
    </Grid>
  )
}

export default HomeRecs
