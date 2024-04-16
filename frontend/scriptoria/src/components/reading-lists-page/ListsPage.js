import React from 'react'
import Navbar from '../navbar/Navbar'
import ListCard from './ListCard'
const ListsPage = () => {
  return (
    <>
    <Navbar/>
    ListsPage
    <div className='row justify-content-center'>
    <ListCard className='col-6 col-sm-12'/>
    <ListCard className='col-6 col-sm-12'/>
    </div>
    </>
  )
}

export default ListsPage