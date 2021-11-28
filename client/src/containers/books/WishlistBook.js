import React from 'react'
import { Grid } from '@mui/material'
import BookOverview from '../../components/book/BookOverview'

const WishlistBook = ({ book, recommender, status, adminId, user }) => {
  return (
    <>
      <BookOverview
        book={book}
        recommender={recommender}
        status={status}
        adminId={adminId}
        user={user}
      />
    </>
  )
}

export default WishlistBook
