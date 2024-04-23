import React from 'react'
import {Link} from 'react-router-dom'
import './ListsPage.css'

const ListCard = ({userName, list}) => {
  console.log(list)
  return (
<div>
<div className="list-card text rounded">
  <a className="list-name text-light h3 text-decoration-none fw-bold"><b>{list.name}</b></a>
  <i className="list-arrow bi bi-arrow-right-short" />
  <p>reading list</p>
  <img className="list-pic img-fluid object-fit-cover" src="https://c8.alamy.com/comp/T27DD2/italy-1973-first-edition-of-marvel-comic-books-cover-of-captain-america-T27DD2.jpg" />
  <div className="list-btns">
    <i className="edit-list">edit</i>
    <i className="delete-list">delete</i>
  </div>
  <Link className='list-ball' to={`${userName}/lists/${list._id}`} style={{backgroundColor : "orange"}} />
</div>

</div>
  )
}

export default ListCard