import * as React from 'react'
import Container from '@mui/material/Container'

import Nav from './Nav'

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <Container maxWidth='xl' sx={{ pt: 12 }}>
        {children}
      </Container>
    </>
  )
}

export default Layout
