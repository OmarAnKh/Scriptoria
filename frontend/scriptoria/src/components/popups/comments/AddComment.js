import React from 'react'

const AddComment = () => {
    const sendComment = ()=>{
        const comment = {
        accountId : 1,
        storyId : 2,
        text : document.getElementById('add-comment').value
    }
    console.log(comment)
    document.getElementById('add-comment').value = ''
    }
  return (
    <div className="d-flex flex-row bg-light w-100 rounded">
            <div className="p-2 bd-highlight">
                <img src="https://i.pinimg.com/564x/60/5e/46/605e461ca634e868085d1a3d9d02b1ea.jpg" alt="Profile" className="rounded-circle" width="35" />
            </div>
            <div className="py-1 px-1 bd-highlight flex-grow-1">
                <textarea type="text" className="form-control fs-xs" id="add-comment" placeholder="write something..." />
            </div>
            <div className="py-1 bd-highlight">
                <button className='btn btn-primary bi bi-send-fill' onClick={sendComment}></button>
            </div>
        </div>
  )
}

export default AddComment