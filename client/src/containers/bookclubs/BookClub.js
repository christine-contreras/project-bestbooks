import * as React from 'react'
import { Grid } from '@mui/material'
import BookclubMenu from '../../components/nav/BookclubMenu'
import { useParams } from 'react-router'

const Bookclub = ({ user }) => {
  let params = useParams()

  const [bookclub, setBookclub] = React.useState(null)
  const [loading, setLoading] = React.useState(null)

  React.useEffect(() => {
    setLoading(true)
    fetch(`/api/bookclubs/${params.id}`).then((response) => {
      setLoading(false)
      if (response.ok) {
        response.json().then((data) => {
          console.log(data)
          setBookclub(data)
        })
      } else {
        response.json().then((err) => console.log(err))
      }
    })
  }, [])

  return (
    <>
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
