import React from 'react'
import './Lists.css'

const Lists = () => {

  return (
<div>
<div>
  <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex={-1}>
    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div className="modal-content">
        <div className="modal-header py-2">
          <h1 className="modal-title fs-5" id="exampleModalToggleLabel">save story to...</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
        {
            [...Array(15)].map((_, index)=>{
                return (
            <div key={index} className="container rounded list p-2 my-1">
           <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id={`inlineCheckbox${index}`} defaultValue="option1" />
                <label className="form-check-label" htmlFor={`inlineCheckbox${index}`}>{`list${index}`}</label>
            </div>
            </div>
                )
            })
          }
        </div>
        <div className="container button-group gap-2 p-0">
          <button className="btn btn-primary rounded-0 w-100 m-0" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal"><i className="bi bi-plus-lg"></i> create a new list</button>
        </div>

      </div>
    </div>
  </div>
  <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex={-1}>
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header py-2">
          <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">create a new reading list</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
        <div className="form-check px-0">
        <div className="mb-3">
        <label htmlFor="newList" className="form-label">Name</label>
        <input type="email" className="form-control" id="newList" placeholder="my list" />
        </div>
          </div>
        </div>
        <div className="container gap-2 btn-group p-0">
          <button className="btn btn-primary rounded-0 w-50" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">create and save</button>
          <button className="btn btn-secondary rounded-0 w-50" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">cancel</button>
        </div>
      </div>
    </div>
  </div>
  <button className="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">add to reading list</button>
</div>
  </div>

  )
}

export default Lists