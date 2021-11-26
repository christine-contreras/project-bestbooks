import * as React from 'react'
import '../../css/Form.css'
import { Grid, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import DeleteModal from '../../components/form/DeleteModal'
import FormBookClub from '../../components/form/FormBookClub'

const BookClubDashboard = ({
  bookclub,
  user,
  setCurrentBookclub,
  fetchUser,
}) => {
  let navigate = useNavigate()
  //handle modal
  const [openModal, setOpenModal] = React.useState(false)
  const handleOpenModel = () => setOpenModal(true)
  const handleCloseModel = () => setOpenModal(false)

  const handleDeleteBookclub = () => {
    fetch(`/api/bookclubs/${bookclub.id}`, {
      method: 'DELETE',
    }).then((response) => {
      if (response.ok) {
        fetchUser()
        navigate('/profile/my-bookclubs')
      }
    })
  }

  return (
    <>
      {!user ? (
        navigate('/')
      ) : user.id !== bookclub.admin.id ? (
        <Grid item container spacing={3} flexDirection='column'>
          <Grid item>
            <Typography component='h1' variant='h4' align='center' paddingTop>
              Access Denied
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              component='p'
              variant='subtitle1'
              align='center'
              paddingTop>
              You don't have admin access. Please contact your admin for further
              help.
            </Typography>
          </Grid>
          <Grid item container flexDirection='column'>
            <Typography component='h1' variant='h5' align='center' paddingTop>
              Contact Admin
            </Typography>
            <Typography
              component='p'
              variant='subtitle1'
              align='center'
              paddingTop>
              name: {`${bookclub.admin.first_name} ${bookclub.admin.last_name}`}
            </Typography>
            <Typography component='p' variant='subtitle1' align='center'>
              email: {bookclub.admin.email}
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <>
          <Grid item>
            <Typography component='h1' variant='h4' align='center' paddingTop>
              Edit Book Club
            </Typography>
          </Grid>
          <Grid item>
            <FormBookClub
              bookclub={bookclub}
              fetchUser={fetchUser}
              setCurrentBookclub={setCurrentBookclub}
            />
          </Grid>
          <Grid item textAlign='right' sx={{ pt: 10 }}>
            <Button
              variant='text'
              className='b-radius btn btn-lg'
              color='error'
              onClick={handleOpenModel}>
              Delete Book Club
            </Button>
          </Grid>

          <DeleteModal
            openModal={openModal}
            handleCloseModel={handleCloseModel}
            handleDeleteBookclub={handleDeleteBookclub}
          />
        </>
      )}
    </>
  )
}

export default BookClubDashboard
