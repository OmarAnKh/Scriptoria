import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { getValidStoriesFrom } from '../../api/readingListsApi';
import { Buffer } from 'buffer';
import logo from '../../img/scriptoria-logo-black.png';
import Popup from './Popup';
import useAuth from '../../hooks/useAuth'; 
import './AllListsPage.css'

const ListCard = ({userName, list, update}) => {
  const {auth} = useAuth()
  const [cover, setCover] = useState(logo)
  const [color, setColor] = useState('chocolate')
  const [name, setName] = useState(list.name);

  useEffect(()=>{
    const fetchData = async ()=>{
      const data = await getValidStoriesFrom(userName, list._id, auth?.userInfo?._id)
      const stories = data.stories.filter((story)=> story!==undefined)
      if(stories.length > 0){
        setColor(stories[0]?.backgroundColor)
        setCover(`data:image/png;base64,${Buffer.from(stories[0]?.coverPhoto).toString('base64')}`)
      }
    }
    fetchData()
  },[])


  return (
<div>
  <div className='d-none'>
    </div>
      <div className="list-card border text rounded">
        <Link className="list-name text-light display-5 pb-1 text-decoration-none fw-bold text-break" title={list.name} to={`/profile/${userName}/lists/${list._id}`} ><b>{list.name}</b></Link>
        <i className="list-arrow bi bi-arrow-right-short ml-0" ><Link to={`/profile/${userName}/lists/${list._id}`} /></i>
        <p>reading list</p>
        <img className="list-pic img-fluid object-fit-cover bg-light" src={cover} />
        <Popup page="allLists" list={list} update={update} name={name} setName={setName}/>
        <Link className='list-ball' to={`/profile/${userName}/lists/${list._id}`} style={{backgroundColor : color}} />
      </div>
</div>
  )
}

export default ListCard