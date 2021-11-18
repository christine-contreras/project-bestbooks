import React from 'react'
import Hero from '../components/home/Hero'
import HomeRecs from './HomeRecs'

const Home = ({ user }) => {
  return (
    <>
      <Hero user={user} />
      <HomeRecs user={user} />
    </>
  )
}

export default Home
