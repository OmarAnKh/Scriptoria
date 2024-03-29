import React from 'react'
import Comment from './Comment'
import AddComment from './AddComment'

const Comments = () => {
  return (
    <>
<div>
  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
    Comment
  </button>
  <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div className="modal-content">
        <div className="modal-header py-2">
          <h1 className="modal-title fs-5" id="staticBackdropLabel">Comments</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body p-0">
        <Comment 
                username="abood" 
                comment="from what yr is gen z ? Containers center and horizontally pad your content. Use .container for a responsive pixel width, .container-fluid for width: 100% across all viewports and devices, or a responsive container (e.g., .container-md) for a combination of fluid and pixel widths." 
                time="5h" 
                likes="1"
            />
      </div>
      <div className="modal-footer p-0">
        <AddComment/>
        </div>
      </div>
    </div>
  </div>
</div>


    </>
  )
}

export default Comments