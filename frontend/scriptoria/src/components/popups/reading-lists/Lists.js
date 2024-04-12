import React, { useState, useEffect } from "react";
import {
  getReadingLists,
  createReadingList,
  updateReadingLists,
} from "../../../api/readingListsApi";
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next';
import "./Lists.css";
import useAuth from "../../../hooks/useAuth";


const Lists = ({ storyId }) => {
  const { auth } = useAuth();
  const { t } = useTranslation()

  const [signedIn, setSignedIn] = useState(false);
  const [lists, setLists] = useState([]);
  const [checkedLists, setCheckedValues] = useState([]);
  const token = auth.token;

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.userName;
      if (user) {
        setSignedIn(true);
        const readingLists = await getReadingLists(token);
        setLists(readingLists.data);
        const listsWithStory = readingLists.data.filter(list => list.stories.includes(storyId));
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



  const saveData = async () => {
    try {
      const response = await getReadingLists(token)

      if (response && response.data) {
        const lists = response.data;
        await toast.promise(updateReadingLists(storyId, checkedLists, token, lists), {
          loading: 'Saving data...',
          success: 'Data saved successfully.',
          error: 'Failed to save data. Please try again later.',
        });
      }
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Failed to save data. Please try again later.");
    }
  };


  const createList = async () => {
    const listName = document.getElementById('newList').value;
    const newList = {
      name: listName,
      stories: [storyId]
    };

    try {
      await toast.promise(createReadingList(newList, token), {
        loading: 'Creating list...',
        success: 'List created successfully.',
        error: 'Failed to create list. Please try again later.',
      });
      const updatedLists = await getReadingLists(token);
      if (updatedLists && updatedLists.data) {
        setLists(updatedLists.data);
      }


      const newListId = updatedLists.data.find(list => list.name === listName)._id;
      setCheckedValues([...checkedLists, newListId]);

      document.getElementById('newList').value = ""
    } catch (error) {
      console.error(error);
      toast.error("Failed to create list. Please try again later.");
      document.getElementById('newList').value = ""
    }
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
                  {t("SaveTo.SaveTo")}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                {lists.map((list, index) => {
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
                })}
              </div>
              <div className="container btn-group gap-2 mb-2">
                <button
                  className="btn btn-primary rounded w-50"
                  data-bs-target="#createList"
                  data-bs-toggle="modal"
                >
                  <i className="bi bi-plus-lg"></i> {t("SaveTo.createNewList")}
                </button>
                <button
                  className="btn btn-primary rounded w-50"
                  data-bs-dismiss="modal"
                  onClick={saveData}
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
                  {t("SaveTo.createRLPopUp")}
                </span>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="form-check px-0">
                  <div className="mb-3">
                    <label htmlFor="newList" className="form-label">
                      {t("SaveTo.Name")}
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="newList"
                      placeholder="my list"
                    />
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
                  {t("SaveTo.createAndSave")}
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

