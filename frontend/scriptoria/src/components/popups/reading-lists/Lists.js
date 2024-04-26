import React, { useState, useEffect } from "react";
import {
  getReadingLists,
  createReadingList,
  updateReadingLists,
} from "../../../api/readingListsApi";
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next';
import useAuth from "../../../hooks/useAuth";
import "./Lists.css";

const Lists = ({ storyId }) => {
  const { auth } = useAuth();
  const { t } = useTranslation()
  const [signedIn, setSignedIn] = useState(false);
  const [lists, setLists] = useState([]);
  const [checkedLists, setCheckedValues] = useState([]);
  const [valid, setValid] = useState(true);
  const token = auth.token;
  const userName = auth.userName;

  useEffect(() => {
    const fetchData = async () => {
      if (userName) {
        setSignedIn(true);
        const readingLists = await getReadingLists(userName,true);
        setLists(readingLists);
        const listsWithStory = readingLists.filter(list => list.stories.includes(storyId));
        setCheckedValues(listsWithStory.map(list => list._id));
      }
    };
    fetchData();
  }, []);
  

  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      setCheckedValues([...checkedLists, event.target.value]);
    } else {
      setCheckedValues(checkedLists.filter(value => value !== event.target.value));
    }
  };

  const updateData = async () => {
    try {
        await toast.promise(updateReadingLists(storyId, checkedLists, userName, token), {
          loading: 'Saving data...',
          success: 'Data saved successfully.',
          error: 'Failed to save data. Please try again later.',
        });
      
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Failed to save data. Please try again later.");
    }
  };

  const createList = async () => {
    const listName = document.getElementById('newList').value;
    setValid(!lists.find(list => list.name === listName));
    if (valid){

    try {
      setValid(!lists.find(list => list.name === listName));
      if (valid){
      const newList = {
        name: listName,
        stories: [storyId],
        privacy : document.getElementById("list-privacy").value
      };
      await toast.promise(createReadingList(newList, token), {
        loading: 'Creating list...',
        success: 'List created successfully.',
        error: 'Failed to create list. Please try again later.',
      });
      const updatedLists = await getReadingLists(userName,true);
      if (updatedLists) {
        setLists(updatedLists);
      }

      const newListId = updatedLists.find(list => list.name === listName)._id;
      setCheckedValues([...checkedLists, newListId]);

      document.getElementById('newList').value = ""}
    } catch (error) {
      console.error(error);
      toast.error("Failed to create list. Please try again later.");
    }}
  };

  return (
    <div>
      <div>
        <div
          className="modal fade"
          id="addToList"
          aria-hidden="true"
          aria-labelledby="addToListLabel"
          tabIndex={-1}
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header py-2">
                <h1 className="modal-title fs-5" id="addToListLabel">
                  {t("SaveTo.save-to")}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body h6">
                {lists.length > 0 ? lists.map((list, index) => {
                  return (
                    <div
                      key={index}
                      className="container rounded list p-2 my-1"
                    >
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`${list._id}-list`}
                          value={list._id}
                          checked={checkedLists.includes(list._id)}
                          onChange={handleCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`${list._id}-list`}
                        >
                          {list.name}
                        </label>
                      </div>
                    </div>
                  );
                }) : <div className="d-flex justify-content-center align-items-center" style={{height : '480px'}}>
                <div className="text-center text-secondary h6">
                  you have no lists, create one to save the story
                </div>
              </div>}
              </div>
              <div className="container btn-group gap-2 mb-2">
                <button
                  className="btn btn-primary rounded w-50"
                  data-bs-target="#createList"
                  data-bs-toggle="modal"
                >
                  <i className="bi bi-plus-lg"></i> {t("SaveTo.create-a-new-list")}
                </button>
                <button
                  className="btn btn-primary rounded w-50"
                  data-bs-dismiss="modal"
                  onClick={updateData}
                >
                  {t("SaveTo.save")}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="createList"
          aria-hidden="true"
          aria-labelledby="addToListLabel2"
          tabIndex={-1}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header py-2">
                <span
                  className="modal-title fs-5"
                  id="addToListLabel2"
                >
                  {t("SaveTo.create-reading-list-popop")}
                </span>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body h6">
                <div className="form-check px-0">
                  <div className="mb-3">
                    <label htmlFor="newList" className="form-label">
                      {t("SaveTo.Name")}
                    </label>
                    <input
                      className={`form-control ${valid? "" : "is-invalid"}`}
                      id="newList"
                      placeholder="my list"
                      aria-describedby = "new-name-validation"
                    />
                    {
                        valid? <></>
                        : <div id="new-name-validation" className="invalid-feedback">
                        list already exists
                      </div> }
                  </div>
                  <div className="mb-3">
                  <label htmlFor="list-privacy" className="form-label">privacy</label>
                      <select className="form-select form-select-lg mb-3" id="list-privacy" aria-label="Large select example">
                      <option value={false}>private</option>
                      <option value={true}>public</option>
                      </select>
                      </div>
                </div>
              </div>
              <div className="container gap-2 btn-group mb-2">
                <button
                  className="btn btn-primary rounded w-50"
                  data-bs-target="#addToList"
                  data-bs-toggle="modal"
                  onClick={createList}
                >
                  {t("SaveTo.create-and-save")}
                </button>
                <button
                  className="btn btn-secondary rounded w-50"
                  data-bs-target="#addToList"
                  data-bs-toggle="modal"
                >
                  {t("SaveTo.cancel")}
                </button>
              </div>
            </div>
          </div>
        </div>
        <i className="bi bi-plus-lg"
          data-bs-target="#addToList"
          data-bs-toggle={signedIn ? "modal" : ""}
          style={{ color: 'white', cursor: 'pointer', fontSize: '2.5rem', justifySelf: 'center' }}></i>
      </div>
    </div >
  );
};

export default Lists;

