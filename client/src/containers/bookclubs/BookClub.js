import * as React from 'react'
import { Grid, Typography } from '@mui/material'
import BookClubMenu from '../../components/nav/BookClubMenu'
import Loading from '../../components/Loading'
import { useParams, Outlet } from 'react-router'

const Bookclub = ({ user, handleFetchBookClub, loading, bookclub }) => {
  let params = useParams()

  React.useEffect(() => {
    handleFetchBookClub(params.id)
  }, [])

  return loading ? (
    <Grid container alignItems='center' justifyContent='center'>
      <Loading />
    </Grid>
  ) : (
    <>
      {bookclub &&
        (bookclub.error || bookclub.errors ? (
          <Grid
            item
            container
            flexDirection='column'
            wrap='nowrap'
            alignItems='center'>
            <Typography component='h1' variant='h4' align='center'>
              {bookclub.error ? bookclub.error : bookclub.errors}
            </Typography>
          </Grid>
        ) : (
          <>
            <Grid item xs={12} md={4} lg={3}>
              <BookClubMenu user={user} bookclub={bookclub} />
            </Grid>

            <Grid
              item
              container
              flexDirection='column'
              spacing={3}
              xs={12}
              md={8}
              lg={9}
              sx={{ pl: 4 }}>
              <Outlet />
            </Grid>
          </>
        ))}
    </>
  )
}

export default Bookclub
