import React from 'react'
import '../../css/Form.css'
import '../../css/Profile.css'
import FormProfile from '../../components/form/FormProfile'
import DeleteModal from '../../components/form/DeleteModal'
import { Grid, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ProfileInfo = ({ user, handleCheckLogin, setUser }) => {
  let navigate = useNavigate()

  //handle modal
  const [openModal, setOpenModal] = React.useState(false)
  const handleOpenModel = () => setOpenModal(true)
  const handleCloseModel = () => setOpenModal(false)

  const handleDeleteProfile = () => {
    fetch(`/api/users/${user.id}`, {
      method: 'DELETE',
    }).then((response) => {
      if (response.ok) {
        setUser(null)
        navigate('/')
      }
    })
  }

  return (
    <>
      <Grid item>
        <Typography component='h1' variant='h4' align='center' paddingTop>
          Edit Profile
        </Typography>
      </Grid>
      <Grid item>
        <FormProfile user={user} handleCheckLogin={handleCheckLogin} />
      </Grid>
      <Grid item textAlign='right' sx={{ pt: 10 }}>
        <Button
          variant='text'
          className='b-radius btn btn-lg'
          color='error'
          onClick={handleOpenModel}>
          Delete Profile
        </Button>
      </Grid>

      <DeleteModal
        openModal={openModal}
        handleCloseModel={handleCloseModel}
        handleDelete={handleDeleteProfile}
        item='Profile'
        warningMessage='Are you sure you want to delete your profile?'
      />
    </>
  )
}

export default ProfileInfo
