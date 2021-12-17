import * as React from 'react'
import { Grid, Typography, Button, Snackbar, Alert } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import BookOverview from '../../components/book/BookOverview'
import BookStatusModal from '../../components/form/BookStatusModal'
import GuideQuestions from '../books/GuideQuestions'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading'
import Goals from '../books/Goals'

const BookClubCurrenBook = ({
  bookclub,
  user,
  loading,
  handleFetchBookClub,
}) => {
  let navigate = useNavigate()

  const [currentBook, setCurrentBook] = React.useState(null)
  const [goals, setGoals] = React.useState([])
  const [guideQuestions, setGuideQuestions] = React.useState([])
  const [bookStatus, setBookStatus] = React.useState(null)
  const [edit, setEdit] = React.useState(false)
  const [isAdmin, setIsAdmin] = React.useState(false)
  const [isMember, setIsMember] = React.useState(false)

  // handle snackbar message book completed
  const [successDeleteMessage, setSuccessDeleteMessage] = React.useState(false)
  const handleOpenSuccessDeleteMessage = () => setSuccessDeleteMessage(true)
  const handleCloseSuccessDeleteMessage = () => setSuccessDeleteMessage(false)

  const handleEditing = () => {
    if (edit) {
      setEdit(false)
      handleFetchBookClub(bookclub.id)
    } else {
      setEdit(true)
    }
  }

  React.useEffect(() => {
    if (bookclub) {
      const current = bookclub.bookclub_books.find(
        (book) => book.current === true
      )
      setCurrentBook(current)
      setBookStatus(current ? current.status : null)
      setGoals(current ? current.goals : [])
      setGuideQuestions(current ? current.guide_questions : [])

      if (user) {
        const member = bookclub.users.find((member) => member.id === user.id)
        setIsAdmin(user.id === bookclub.admin.id)
        setIsMember(member ? true : false)
      } else {
        setIsAdmin(false)
        setIsMember(false)
      }
    }
  }, [bookclub, user])

  //handle current book status modal
  const [openModal, setOpenModal] = React.useState(false)
  const handleOpenStatusModel = () => setOpenModal(true)
  const handleCloseStatusModel = () => setOpenModal(false)

  return (
    <>
      {loading && <Loading />}
      {bookclub && (
        <Grid item container flexDirection='column' spacing={6}>
          <Grid item>
            <Typography
              component='h1'
              variant='h3'
              align='center'
              paddingTop
              paddingBottom>
              {bookclub.name} Book Club
            </Typography>
          </Grid>
          {!currentBook ? (
            <Grid item container flexDirection='column' spacing={4}>
              <Grid item>
                <Typography
                  component='p'
                  variant='subtitle1'
                  align='center'
                  paddingTop>
                  No Current Book
                </Typography>
              </Grid>
              {isAdmin && (
                <Grid item textAlign='center'>
                  <Button
                    onClick={() => navigate('/search')}
                    variant='contained'
                    className='b-radius btn btn-lg'
                    color='primary'>
                    Search Books
                  </Button>
                </Grid>
              )}
            </Grid>
          ) : (
            <Grid item container flexDirection='column' spacing={6}>
              {user && isAdmin && (
                <Grid item textAlign='center'>
                  <Button
                    onClick={handleEditing}
                    startIcon={edit ? <AssignmentTurnedInIcon /> : <EditIcon />}
                    variant='contained'
                    className='b-radius btn btn-lg'
                    color='primary'>
                    {edit ? 'Save Edits' : 'Edit Page'}
                  </Button>
                </Grid>
              )}

              <Grid item>
                <BookOverview
                  book={currentBook.book}
                  status={bookStatus}
                  setStatus={setBookStatus}
                  edit={edit}
                  user={user}
                  handleOpenStatusModel={handleOpenStatusModel}
                  isCurrentBook={currentBook.current}
                />
              </Grid>
              <Grid item>
                <Goals
                  edit={edit}
                  user={user}
                  goals={goals}
                  setGoals={setGoals}
                  pagecount={currentBook.book.pages}
                  bookClubBookId={currentBook.id}
                />
              </Grid>

              <Grid item>
                <GuideQuestions
                  edit={edit}
                  guideQuestions={guideQuestions}
                  setGuideQuestions={setGuideQuestions}
                  bookClubBookId={currentBook.id}
                  isMember={isMember}
                  user={user}
                />
              </Grid>
            </Grid>
          )}
          {edit && bookclub && (
            <BookStatusModal
              openModal={openModal}
              handleCloseStatusModel={handleCloseStatusModel}
              currentBook={currentBook}
              setCurrentBook={setCurrentBook}
              handleFetchBookClub={handleFetchBookClub}
              bookClubId={bookclub.id}
              setStatus={setBookStatus}
              handleOpenSuccessDeleteMessage={handleOpenSuccessDeleteMessage}
            />
          )}
        </Grid>
      )}

      <Snackbar
        open={successDeleteMessage}
        autoHideDuration={6000}
        onClose={handleCloseSuccessDeleteMessage}>
        <Alert
          variant='filled'
          onClose={handleCloseSuccessDeleteMessage}
          severity='info'
          sx={{ width: '100%' }}>
          Book Successfully Archived
        </Alert>
      </Snackbar>
    </>
  )
}

export default BookClubCurrenBook
