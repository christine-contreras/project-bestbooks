import * as React from 'react'
import Recommendation from '../../components/home/Recommendation'
import { Grid, Typography, Button } from '@mui/material'
import { data } from '../../helpers/booksrec'
import { useNavigate } from 'react-router-dom'

const apiKey = process.env.REACT_APP_API_BOOKS

const HomeRecs = ({ user, recommendationLists, handleListSearch }) => {
  let navigate = useNavigate()
  const [recommendations, setRecommendations] = React.useState(
    recommendationLists
      ? recommendationLists[Math.floor(Math.random() * data.length)]
      : null
  )

  React.useEffect(() => {
    setRecommendations(
      recommendationLists
        ? recommendationLists[Math.floor(Math.random() * data.length)]
        : null
    )
  }, [recommendationLists])

  const handleViewListClick = () => {
    handleListSearch(`${recommendations.id}`)
    navigate('/search')
  }

  return (
    <Grid container direction='column' sx={{ pt: 10 }}>
      {recommendations && (
        <>
          <Typography component='h2' variant='h4' align='center' paddingTop>
            A List Of The {recommendations.name}
          </Typography>
          <Typography component='p' variant='subtitle1' align='center'>
            Explore These Top Picks
          </Typography>
          <Grid item className='padding-top' textAlign='center'>
            <Button
              onClick={handleViewListClick}
              variant='outlined'
              color='primary'
              className='b-radius btn'>
              View All Books
            </Button>
          </Grid>

          <Grid container item spacing={3} sx={{ pt: 6, pb: 6 }}>
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
