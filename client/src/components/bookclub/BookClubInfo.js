import React from 'react'
import { AvatarGroup, Avatar, Typography } from '@mui/material'
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
      <AvatarGroup max={4}>
        {members.map((user) => (
          <Avatar
            sx={{ bgcolor: user.profile_color, width: 45, height: 45 }}
            key={`bookclub-admin-${user.id}`}>
            {changeToInitials(user.full_name)}
          </Avatar>
        ))}
      </AvatarGroup>
    </>
  )
}

export default BookClubInfo
