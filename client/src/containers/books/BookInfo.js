import * as React from 'react'
import '../../css/Book.css'
import NotFound from '../NotFound'
import Loading from '../../components/Loading'
import AddToWishlistModal from '../../components/form/AddToWishlistModal'
import BookOverview from '../../components/book/BookOverview'
import { useParams } from 'react-router-dom'

const BookInfo = ({ book, loading, user, handleFetchBook }) => {
  let params = useParams()

  //handle modal
  const [openModal, setOpenModal] = React.useState(false)
  const handleOpenModel = () => setOpenModal(true)
  const handleCloseModel = () => setOpenModal(false)

  React.useEffect(() => {
    if (!book) {
      handleFetchBook(params.id)
    }
  }, [])

  return loading ? (
    <Loading />
  ) : book && book.error ? (
    <NotFound />
  ) : (
    book && (
      <>
        <BookOverview
          book={book}
          handleOpenModel={handleOpenModel}
          user={user}
        />
        {user && (
          <AddToWishlistModal
            openModal={openModal}
            bookclubs={user.bookclubs}
            handleCloseModel={handleCloseModel}
            book={book}
          />
        )}
      </>
    )
  )
}

export default BookInfo
