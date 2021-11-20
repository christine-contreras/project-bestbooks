import * as React from 'react'
import { Menu, MenuItem } from '@mui/material'
import { useNavigate } from 'react-router'

const DropdownMenu = ({
  moreAnchorEl,
  isMenuOpen,
  handleMenuClose,
  onLogout,
}) => {
  let navigate = useNavigate()

  return (
    <Menu
      anchorEl={moreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id='menu-options'
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem onClick={() => navigate(`/search`)}>Search Books</MenuItem>
      <MenuItem onClick={() => navigate(`/profile/my-info`)}>Profile</MenuItem>
      <MenuItem onClick={() => navigate(`/profile/my-bookclubs`)}>
        My Book Clubs
      </MenuItem>
      <MenuItem onClick={onLogout}>Logout</MenuItem>
    </Menu>
  )
}

export default DropdownMenu
