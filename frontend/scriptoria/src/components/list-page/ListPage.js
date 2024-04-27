import React, { useState, useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import { useParams } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { getValidStoriesFrom } from '../../api/readingListsApi'
import Popup from '../all-lists-page/Popup'
import { useTranslation } from 'react-i18next';

const ListPage = () => {
  const { auth } = useAuth()
  const {t} = useTranslation()
  const { userName, id } = useParams()
  const [list, setList] = useState({})
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tempList = await getValidStoriesFrom(userName, id, auth?.userInfo?._id)
        setList({...tempList, stories : tempList.stories.filter((story)=> story!==undefined)})
        setName(tempList.name)
        
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    console.log(list)

  }, [list])

const update = async ()=>{
  try{
    const tempList = await getValidStoriesFrom(userName, id, auth?.userInfo?._id)
    setList(tempList)
    setName(tempList.name)
  } catch(error){
    console.log(error)
  }
}

  return (
    <>
      <Navbar />
      <div className='container'>
        <div className='row py-4 justify-content-between'>
        {list?.name? <>
          <div className='col-md-6 col-sm-12 display-2 text-md-start text-sm-center'>{list.name}</div>
        <div className='col-md-4 col-sm-12 text-md-end text-sm-center'>
          <Popup page="list" list={list} name={name} setName={setName} update={update} />
        </div></> : <div className='justify-content-center align-items-center'><h1>{t("Lists.loadig")}</h1></div>}
        </div>
      </div>
    </>
  )
}

export default ListPage

