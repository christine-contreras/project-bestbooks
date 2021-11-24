import * as React from 'react'
import { Grid, Typography } from '@mui/material'
import BookclubMenu from '../../components/nav/BookclubMenu'
import Loading from '../../components/Loading'
import { useParams } from 'react-router'

const Bookclub = ({ user }) => {
  let params = useParams()

  const [bookclub, setBookclub] = React.useState(null)
  const [loading, setLoading] = React.useState(null)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    setLoading(true)
    fetch(`/api/bookclubs/${params.id}`).then((response) => {
      console.log(response)
      setLoading(false)
      if (response.ok) {
        response.json().then((data) => {
          setBookclub(data)
        })
      } else {
        response.json().then((error) => setError(error.error))
      }
    })
  }, [])

  return loading ? (
    <Grid container alignItems='center' justifyContent='center'>
      <Loading />
    </Grid>
  ) : (
    <>
      {error && (
        <Grid
          container
          flexDirection='column'
          wrap='nowrap'
          alignItems='center'>
          <Typography component='h1' variant='h4' align='center'>
            {error}
          </Typography>
        </Grid>
      )}
      {bookclub && (
        <>
          <Grid item xs={12} md={4} lg={3}>
            <BookclubMenu user={user} bookclub={bookclub} />
          </Grid>

          <Grid
            item
            container
            flexDirection='column'
            spacing={3}
            xs={12}
            md={8}
            lg={9}
            sx={{ p: 4 }}></Grid>
        </>
      )}
    </>
  )
}

export default Bookclub
