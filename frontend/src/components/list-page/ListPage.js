import React, { useState, useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import { useParams } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { getValidStoriesFrom } from '../../api/readingListsApi'
import Popup from '../all-lists-page/Popup'
import { useTranslation } from 'react-i18next';
import PrivateList from '../no-access-pages/PrivateList'
import EmptyList from '../empty-pages/EmptyList'
import MyCard from '../my-works/my-works-card/MyCard'
import { Buffer } from 'buffer'
import './ListPage.css'

const ListPage = () => {
  const { auth } = useAuth()
  const { userName, id } = useParams()
  const [list, setList] = useState({})
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tempList = await getValidStoriesFrom(userName, id, auth?.userInfo?._id);
        setList({ ...tempList, stories : tempList.stories.filter((story) => story !== undefined) });
        setName(tempList.name);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userName, id, auth?.userInfo?._id]);

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
      {
        userName!==auth?.userName && list.privacy===false ? <PrivateList/> : 
        <div className='container'>
        
        {list?.name && list.stories.length ?  <>
          <div className='row py-4 justify-content-between'>
          <div className='col-md-6 col-sm-12 display-2 text-md-start text-sm-center'>{list.name}</div>
        <div className='col-md-4 col-sm-12 text-md-end text-sm-center'>
          <Popup page="list" list={list} name={name} setName={setName} update={update} />
        </div>
        <div className='conatiner justify-content-center'>
        <div className="container list-story-cards">
                    {list?.stories && list?.stories.map((story, index) => {
                        return (
                            <React.Fragment key={index}>
                                <MyCard
                                    photo={`data:image/png;base64,${Buffer.from(story?.coverPhoto).toString('base64')}`}
                                    storytitle={story.title}
                                    key={index}
                                    storyId={story._id}
                                    userId={story._id}
                                />
                            </React.Fragment>
                        )
                    })}
                </div>
        </div>
        </div>
        </> : <EmptyList/>}
        
      </div>  
      }
    </>
  )
}

export default ListPage

