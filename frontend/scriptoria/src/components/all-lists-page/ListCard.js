import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { getStory } from '../../api/storyAPI';
import { Buffer } from 'buffer';
import logo from '../../img/content.png';
import Popup from './Popup';
import './ListsPage.css'

const ListCard = ({userName, list, update, image}) => {
  const [cover, setCover] = useState(logo)
  const [color, setColor] = useState('chocolate')
  const [name, setName] = useState(list.name);

  useEffect(()=>{
    const fetchData = async ()=>{
      const data = await getStory(list.stories[0], 'stories')
      if(data.story){
        setColor(data.story.backgroundColor)
        setCover(`data:image/png;base64,${Buffer.from(data.story.coverPhoto).toString('base64')}`)
      }
    }
    fetchData()
  },[])

  return (
<div>
<div className='d-none'>
</div>

<div className="list-card text rounded">
  <Link to={`${userName}/lists/${list._id}`} className="list-name text-light display-5 pb-1 text-decoration-none fw-bold text-break"><b>{name}</b></Link>
  <i className="list-arrow bi bi-arrow-right-short ml-0" ><Link className='word-break' to={`${userName}/lists/${list._id}`}/></i>
  <p>reading list</p>
  <img className="list-pic img-fluid object-fit-cover bg-light" src={cover} />
  <Popup list={list} update={update} name={name} setName={setName}/>
  <Link className='list-ball' to={`${userName}/lists/${list._id}`} style={{backgroundColor : color}} />
</div>

</div>
  )
}

export default ListCard