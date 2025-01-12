import React from 'react'
import { Header } from '../Movies/Header'
import { MovieContainerPage } from '../../components/MovieContainerPage'

const Home = () => {
  return (
    <>
     <Header />



     <section className='mt-[10rem]'>
      <MovieContainerPage />
     </section>
    </>
  )
}

export default Home
