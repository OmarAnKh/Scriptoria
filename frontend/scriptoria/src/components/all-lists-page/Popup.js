import React, {useState} from 'react'
import useAuth from '../../hooks/useAuth';
import { createReadingList, deleteReadingList, updateList } from '../../api/readingListsApi';
import {toast} from 'react-hot-toast'
const Popup = ({list}) => {
    const {auth} = useAuth()
    const [type, setType] = useState('')
    const handleList = async()=>{
        try{
            if(type==="copy"){
            const newList = {
                name : list.name,
                stories : [...list.stories]
            }
            await toast.promise(createReadingList(newList, auth.token), {
                loading: 'Creating list...',
                success: 'List created successfully.',
                error: 'Failed to create list. Please try again later.',
              });
            } else if (type==="delete"){
                await toast.promise(deleteReadingList(list._id, auth.token), {
                    loading: 'delete list...',
                    success: 'List deleted successfully.',
                    error: 'Failed to delete list. Please try again later.',
                  });
            } else if(type==="edit"){
                const editedList = {
                    name : document.getElementById('new-name').value,
                    stories : [...list.stories],
                    accountId : list.accountId
                }
                await toast.promise(updateList(editedList, auth.token), {
                    loading: 'updating list...',
                    success: 'List updated successfully.',
                    error: 'Failed to update list. Please try again later.',
                  });
            }
        }catch(error){

        }
    }

  return (
    <div>
    {
    auth.userName ? <>
    <div className="list-btns text-light">
    {
      auth.userInfo._id === list.accountId ?
      <>
      <i className="edit-list"><a className="m-1 text-decoration-none text-light" data-bs-toggle="modal" data-bs-target="#list-btns-modal" onClick={()=> setType("edit")} style={{cursor : "pointer"}}>edit</a></i>
    <i className="delete-list"><a className="m-1 text-decoration-none text-light" data-bs-toggle="modal" data-bs-target="#list-btns-modal" onClick={()=> setType("delete")} style={{cursor : "pointer"}}>delete</a></i>
      </> : <i className="copy-list"><a className="m-1 text-decoration-none text-light" data-bs-toggle="modal" data-bs-target="#list-btns-modal" onClick={()=> setType("copy")} style={{cursor : "pointer"}}>copy</a></i>
    }
  </div>
    </> : <></>
  }
    <div className="modal fade d-normal" id="list-btns-modal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="row justify-content-end mx-0">
            <button type="button" className="btn-close m-2" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body container fs-1">
            <div className='row p-2 fs-5 justify-content-center text-secondary'>
              {/* do whatever u need here, if u want to change anything change the classNames */}
              {
                type==="delete"? <>
                do you want to delete this list?
                </> : type==="copy" ? <>
                do you want to copy this list?
                </> : <>
                <div className="form">
                   <div className="mb-3">
                        <label htmlFor="new-name" className="form-label">list name</label>
                        <input type="text" className="form-control" id="new-name"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="list-privacy" className="form-label">edit privacy</label>
                    <select className="form-select form-select-lg mb-3" id="list-privacy" aria-label="Large select example">
                    <option value={1} selected>public</option>
                    <option value={0}>private</option>
                    </select>

                    </div>
                </div>
                </>
              }
            
              
              <div >
              </div>
            </div>
          </div>
          <div className="container gap-2 btn-group mb-2">
            {/* the first one so u can send the invitation, the second one to cancel and close the modal */}
            <button type="button" className="btn btn-primary rounded" >{type==="edit" ? "save" : "yes" }</button>
            <button type="button" className="btn btn-secondary rounded" data-bs-dismiss="modal">cancel</button>
          </div>

        </div>
      </div>
    </div>
  </div>
  )
}

export default Popup