import React from 'react'
import { orange, teal, brown } from '@mui/material/colors'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import BookmarkIcon from '@mui/icons-material/Bookmark'

const NavLoggedIn = () => {
  return (
    <>
      <div className='search-bar b-radius'>
        <TextField
          label='Search'
          variant='standard'
          // value={search}
          // onChange={(event) => setSearch(event.target.value)}
        />
        <SearchIcon />
      </div>
      <div className='flex'>
        <Button variant='contained' startIcon={<BookmarkIcon />}>
          My Book Clubs
        </Button>

        <Avatar sx={{ bgcolor: teal[900] }}>CC</Avatar>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='open drawer'
          // onClick={toggleDrawer}
        >
          <MoreVertIcon />
        </IconButton>
      </div>
    </>
  )
}

export default NavLoggedIn
