import React from 'react'
import './ListsPage.css'

const ListCard = () => {
  return (
    <>
    <div>
  <div className="list-container col-6">
    <div className="list-card">
      <h2>To Read Later</h2>
      <i className="bi bi-arrow-right" />
      <p>reading list</p>
      <div className="list-pic" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1525543907410-b2562b6796d6?ixlib=rb-0.3.5&s=9ff8e5e718a6a40cbd0e1471235912f4&auto=format&fit=crop&w=3452&q=80")'}} />

      <div className="social">
        <i className="bi bi-facebook" />
        <i className="bi bi-twitter" />
        <i className="bi bi-instagram" />
        <i className="bi bi-github" />
      </div>
      <button>
      </button>
    </div>
  </div>
  <a href="https://dribbble.com/YancyMin" className="dr-url" target="_blank"><img className="dr" src="https://cdn.dribbble.com/assets/logo-footer-hd-a05db77841b4b27c0bf23ec1378e97c988190dfe7d26e32e1faea7269f9e001b.png" alt /></a>
</div>

  </>
  )
}

export default ListCard