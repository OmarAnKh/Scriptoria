import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { createReadingList, deleteReadingList, updateList } from '../../api/readingListsApi';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const Popup = ({ page, list, update }) => {
  const { auth } = useAuth();
  const { t } = useTranslation()
  const [type, setType] = useState('');
  const [name, setName] = useState(list.name)
  const shareHandler = async () => {
    try {
      await navigator.share({
        title: document.title,
        url: window.location.href
      });
    } catch (error) {
      toast.error("could'nt copy the link.")
    }
  };
  const handleList = async () => {
    try {
      if (type === 'copy') {
        const newList = {
          name: list.name,
          stories: [...list.stories],
          privacy: list.privacy
        };
        const res = await createReadingList(newList, auth?.token)
        if(res.statusText==='OK') toast.success("you have copied this list successfully")
      } else if (type === 'delete') {
        const res = await deleteReadingList(list._id, auth?.token)
        if(res.statusText==='OK') toast.success("you have deleted this list successfully")
        window.location.reload()
      } else if (type === 'edit') {
        const stories = page === "list" ? list.stories.map((story) => story._id) : list.stories
        const editedList = {
          name: name,
          stories,
          accountId: list.accountId,
          privacy: document.getElementById('list-privacy').value,
          _id: list._id
        };
        const res = await updateList(editedList, auth?.token)
        if(res.statusText==='OK') toast.success("you have edited this list successfully")
      }
      update();
    } catch (error) {
      console.log(error)
      toast.error("looks like theres an error, try again please")
    }
  };


  return (
    <div>
      {auth?.userName && page === "allLists" ? (
        <>
          <div className="list-btns text-light">
            <i className="edit-list">
              <a
                className="m-1 text-decoration-none text-light"
                onClick={shareHandler}
                style={{ cursor: 'pointer' }}
              >
                {t("Lists.share")}
              </a>
            </i>
            {auth?.userInfo._id === list.accountId ? (
              <>
                <i className="edit-list">
                  <a
                    className="m-1 text-decoration-none text-light"
                    data-bs-toggle="modal"
                    data-bs-target={`#list-btns-modal-${type}-${list._id}`}
                    onClick={() => setType('edit')}
                    style={{ cursor: 'pointer' }}
                  >
                    {t("Lists.edit")}
                  </a>
                </i>
                <i className="delete-list">
                  <a
                    className="m-1 text-decoration-none text-light"
                    data-bs-toggle="modal"
                    data-bs-target={`#list-btns-modal-${type}-${list._id}`}
                    onClick={() => setType('delete')}
                    style={{ cursor: 'pointer' }}
                  >
                    {t("Lists.delete")}
                  </a>
                </i>
              </>
            ) : (
              <i className="copy-list">
                <a
                  className="m-1 text-decoration-none text-light"
                  data-bs-toggle="modal"
                  data-bs-target={`#list-btns-modal-${type}-${list._id}`}
                  onClick={() => setType('copy')}
                  style={{ cursor: 'pointer' }}
                >
                  {t("Lists.copy")}
                </a>
              </i>
            )}
          </div>
        </>
      ) : auth?.userName && page === "list" ? (
        <>
          <div>
            {auth?.userInfo._id === list.accountId ? (
              <div className='container mt-2'>
                <i>
                  <button
                    className="btn btn-secondary popup-edit-btn m-1 text-decoration-none"
                    onClick={shareHandler}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bi bi-share-fill mx-1" />
                    {t("Lists.share")}
                  </button>
                </i>
                <i>
                  <button
                    className="btn btn-secondary popup-edit-btn m-1 text-decoration-none"
                    data-bs-toggle="modal"
                    data-bs-target={`#list-btns-modal-${type}-${list._id}`}
                    onClick={() => setType("edit")}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bi bi-pencil-square mx-1" />
                    {t("Lists.edit")}
                  </button>
                </i>
                <i>
                  <button
                    className="btn btn-danger popup-delete-btn m-1 text-decoration-none"
                    data-bs-toggle="modal"
                    data-bs-target={`#list-btns-modal-${type}-${list._id}`}
                    onClick={() => setType("delete")}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bi bi-trash3-fill mx-1" />
                    {t("Lists.delete")}
                  </button>
                </i>
              </div>
            ) : (

              <div className='container mt-2'>
                <i>
                  <button
                    className="btn btn-secondary popup-copy-btn m-1 text-decoration-none"
                    data-bs-toggle="modal"
                    data-bs-target={`#list-btns-modal-${type}-${list._id}`}
                    onClick={() => setType("copy")}
                    style={{ cursor: "pointer" }}
                  >
                    {t("Lists.copy")}
                  </button>
                </i>
              </div>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="modal fade d-normal" id={`list-btns-modal-${type}-${list._id}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="row justify-content-end mx-0">
              <button type="button" className="btn-close m-2" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body container fs-1">
              <div className='row p-2 fs-5 justify-content-center text-secondary'>
                {
                  type === "delete" ? <>
                    {t("Lists.do-you-want-to-delete-this-list")}
                  </> : type === "copy" ? <>
                    {t("Lists.do-you-want-to-copy-this-list")}
                  </> : <>
                    <div className="form text-start">
                      <div className="mb-3">
                        <label htmlFor="new-name" className="form-label">{t("Lists.list-name")}</label>
                        <input type="text" className="form-control" id="new-name" value={name} onChange={(e) => setName(e.target.value)} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="list-privacy" className="form-label">{t("Lists.edit-privacy")}</label>
                        <select className="form-select form-select-lg mb-3" id="list-privacy" aria-label="Large select example" defaultValue={list.privacy}>
                          <option value={true}>{t("Lists.public")}</option>
                          <option value={false}>{t("Lists.private")}</option>
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
              <button type="button" className="btn btn-primary rounded" onClick={handleList} data-bs-dismiss="modal" >{type === "edit" ? t("Lists.save") : t("Lists.yes")}</button>
              <button type="button" className="btn btn-secondary rounded" data-bs-dismiss="modal">{t("Lists.cancel")}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Popup
