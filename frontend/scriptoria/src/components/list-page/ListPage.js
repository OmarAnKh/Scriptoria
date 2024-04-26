import React, { useState, useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import { useParams } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { getValidStoriesFrom } from '../../api/readingListsApi'
import ListBtns from './ListBtns'

const ListPage = () => {
  const { auth } = useAuth()
  const { userName, id } = useParams()
  const [list, setList] = useState({})
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tempList = await getValidStoriesFrom(userName, id, auth?.userInfo?._id)
        setList(tempList)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    console.log(1,list)

  }, [])

  // const update = async()=>{
  //   try {
  //     const notFilteredList = (await getListWithStories(userName, id)).data
  //     const stories = await Promise.all(
  //       notFilteredList.stories.map(async (story) => {
  //         if(story.publishStatus) {
  //           return story
  //         } else if (!story.publishStatus) {
  //           const response = await getWriters(story._id)
  //           const writers = response.state ? response.users : []
  //           if(writers.length>0){
  //           const found = writers.find(writer => writer.AccountId === auth?.userInfo?._id)
  //           if(found) return story
  //           }
  //         }
  //       })
  //     )
  //     setList({...notFilteredList,stories: stories.filter(story => story !== undefined) })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <>
      <Navbar />
      <div className='container'>
        <div className='row py-4 justify-content-between'>
        <div className='col-md-6 col-sm-12 display-2 text-md-start text-sm-center'>{list.name}</div>
        <div className='col-md-4 col-sm-12 text-md-end text-sm-center'>
          <ListBtns list={list} name={name} setName={setName} />
        </div>
        </div>
      </div>
    </>
  )
}

export default ListPage

