import * as React from 'react'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import { Grid } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import { useNavigate } from 'react-router-dom'
import { changeToInitials } from '../../helpers/helpers'

import DropdownMenu from './DropdownMenu'

const NavLoggedIn = ({ user, onLogout }) => {
  let navigate = useNavigate()

  //project menu to see more options
  const [moreAnchorEl, setMoreAnchorEl] = React.useState(null)
  const isMenuOpen = Boolean(moreAnchorEl)
  const handleMenuOpen = (event) => {
    setMoreAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setMoreAnchorEl(null)
  }

  return (
    <>
      <Grid container alignItems='center' justifyContent='flex-end' spacing={3}>
        <Grid item xs='auto'>
          <Button
            variant='contained'
            color='secondary'
            className='btn b-radius'
            startIcon={<BookmarkIcon />}
            onClick={() => navigate(`/profile/my-bookclubs`)}>
            My Book Clubs
          </Button>
        </Grid>

        <Grid item container xs='auto'>
          <Avatar sx={{ bgcolor: user.profile_color }}>
            {changeToInitials(user.full_name)}
          </Avatar>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='show menu'
            aria-controls='menu-options'
            aria-haspopup='true'
            onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
        </Grid>

        <DropdownMenu
          moreAnchorEl={moreAnchorEl}
          isMenuOpen={isMenuOpen}
          handleMenuClose={handleMenuClose}
          onLogout={onLogout}
        />
      </Grid>
    </>
  )
}

export default NavLoggedIn
