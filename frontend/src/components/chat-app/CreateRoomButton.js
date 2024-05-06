import React from 'react'
import useAuth from '../../hooks/useAuth'

const CreateRoomButton = ({friends}) => {
    const {auth} = useAuth()
    // const tempFriends = [...friends]

  return (
    <>
     <div>
    <a className='bi bi-plus-circle-fill display-4' data-bs-toggle="modal" data-bs-target="#createRoom" ></a>
  <div className="modal fade" id="createRoom" tabIndex={-1} aria-labelledby="myModal" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="myModa">create new room</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
          {/* body */}






        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">colse</button>
          <button type="button" className="btn btn-primary">create</button>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default CreateRoomButton