import * as React from 'react'
import '../../css/Form.css'
import { Grid, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import DeleteModal from '../../components/form/DeleteModal'
import FormBookClub from '../../components/form/FormBookClub'
import NotAdminMessage from '../../components/bookclub/NotAdminMessage'

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
        <NotAdminMessage admin={bookclub.admin} />
      ) : (
        <Grid item container flexDirection='column' spacing={6}>
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
            handleDelete={handleDeleteBookclub}
            item='Book Club'
            warningMessage='Are you sure you want to delete your book club?'
          />
        </Grid>
      )}
    </>
  )
}

export default BookClubDashboard
