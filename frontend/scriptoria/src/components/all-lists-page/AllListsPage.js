import React from 'react'
import Navbar from '../navbar/Navbar'
import Lists from './Lists'
import { useParams } from 'react-router-dom';
const ListPage = () => {
   const {userName} = useParams()
  return (
    <>
    <Navbar/>
    <div className='container display-4'>
        Reading Lists
    </div>
    <Lists userName={userName}/>
    </>
  )
}

export default ListPage