import React from 'react'
import { Grid, Avatar, Typography } from '@mui/material'
import { changeToInitials } from '../../helpers/helpers'

const BookClubInfo = ({ name, members }) => {
  return (
    <>
      <Typography
        component='p'
        variant='subtitle1'
        align='center'
        fontWeight='bold'
        paddingBottom>
        {name}
      </Typography>
      {members.map((user) => (
        <Avatar sx={{ bgcolor: user.profile_color, width: 45, height: 45 }}>
          {changeToInitials(user.full_name)}
        </Avatar>
      ))}
    </>
  )
}

export default BookClubInfo
