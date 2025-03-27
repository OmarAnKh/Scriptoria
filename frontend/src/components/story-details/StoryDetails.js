import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';
import "./StoryDetails.css";
import { UploadButton } from 'react-uploader';
import { Uploader } from "uploader";
import { targetAudiences, languages, categorys, colors } from "./selectsArray"
import { story } from "../../api/storyAPI";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAuth from "../../hooks/useAuth";
import { getDocumentByUsingParams, updateDocument } from '../../api/API\'s';
import { Buffer } from 'buffer';

const uploader = Uploader({
  apiKey: "free",
});

const options = { multi: true };

const StoryDetails = () => {
  const { id } = useParams();
  const { auth } = useAuth();
  const { t } = useTranslation();
  const [storyTitle, setStoryTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [mainCharacters, setMainCharacters] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState("#75B3C2");
  const [category, setCategory] = useState([]);
  const [targetAudience, setTargetAudience] = useState("");
  const [mainCharactersHelper, setMainCharactersHelper] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  const [storyTitleError, setStoryTitleError] = useState("");
  const [languageError, setLanguageError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [mainCharactersError, setMainCharactersError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [targetAudienceError, setTargetAudienceError] = useState("");
  const [uploadedImageUrlError, setUploadedImageUrlError] = useState("");

  const [showColorPickerBackground, setShowColorPickerBackground] =
    useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [numberOfSlides, setNumberOfSlides] = useState("");

  const [oldStory, setOldStory] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const story = await getDocumentByUsingParams("story", id);
      setOldStory(story);
      setStoryTitle(story.title);
      setLanguage(story.language);
      setDescription(story.description);
      setMainCharacters(story.mainCharacters);
      setBackgroundColor(story.backgroundColor);
      setCategory(story.genres);
      setTargetAudience(story.MPAFilmRatings);
      const cover = Buffer.from(story.coverPhoto).toString("base64");
      setUploadedImageUrl(`data:image/png;base64,${cover}`);
    };
    if (id) {
      fetchData();
    }
  }, [])

  const handaleMainCharacters = (value) => {
    if (value === "") {
      return;
    }
    setMainCharacters((prev) => {
      return [...prev, value];
    });
  };

  const handleCategoryToggle = (value) => {
    const isCategory = category.find(
      (categoryValue) => value === categoryValue
    );

    if (isCategory) {
      setCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setCategory((prev) => [...prev, value]);
    }
  };

  const handelDelete = (method, idx) => {
    method((prev) => {
      let newArray = [...prev];
      newArray.splice(idx, 1);
      return newArray;
    });
  };

  const handalStartWriting = async () => {
    let isGoTo = true;
    if (storyTitle === "") {
      setStoryTitleError(t("StoryDetails.title-error"));
      isGoTo = false;
    } else {
      setStoryTitleError("");
    }
    if (language === "") {
      setLanguageError(t("StoryDetails.language-error"));
      isGoTo = false;
    } else {
      setLanguageError("");
    }
    if (description === "") {
      setDescriptionError(t("StoryDetails.description-error"));
      isGoTo = false;
    }
    if (mainCharacters.length === 0) {
      console.log("ok");
    }
    if (category.length === 0) {
      setCategoryError(t("StoryDetails.category-error"));
      isGoTo = false;
    } else {
      setCategoryError("");
    }
    if (targetAudience === "") {
      setTargetAudienceError(t("StoryDetails.target-audience-error"));
      isGoTo = false;
    } else {
      setTargetAudienceError("");
    }
    if (!uploadedImageUrl) {
      setUploadedImageUrlError(t("StoryDetails.uploaded-image-url-error"));
      isGoTo = false;
    } else {
      setUploadedImageUrlError("");
    }
    if (!isGoTo) {
      isGoTo = true;
      return;
    }
    if (id) {
      const storyData = {
        id,
      };
      if (storyTitle !== oldStory.title) {
        storyData.title = storyTitle;
      }
      if (description !== oldStory.description) {
        storyData.description = description;
      }
      if (language !== oldStory.language) {
        storyData.language = language;
      }
      if (targetAudience !== oldStory.MPAFilmRatings) {
        storyData.MPAFilmRatings = targetAudience;
      }
      if (category !== oldStory.genres) {
        storyData.genres = category;
      }
      if (backgroundColor !== oldStory.backgroundColor) {
        storyData.backgroundColor = backgroundColor;
      }
      const cover = Buffer.from(oldStory.coverPhoto).toString("base64");
      if (uploadedImageUrl !== `data:image/png;base64,${cover}`) {
        storyData.coverPhoto = uploadedImageUrl;
      }
      if (mainCharacters !== oldStory.mainCharacter) {
        storyData.mainCharacter = mainCharacters;
      }
      const res = await updateDocument("stories", storyData);
      navigate(`/WritingPage/${id}`);
      return;
    }
    const storyData = {
      title: storyTitle,
      description: description,
      language: language,
      MPAFilmRatings: targetAudience,
      genres: category,
      backgroundColor: backgroundColor,
      coverPhoto: uploadedImageUrl,
      mainCharacters: mainCharacters,
    };

    const res = await story("story", storyData, auth.token);
    navigate(`/WritingPage/${res?.story?._id}`);
  };

  const handelCancel = () => {
    if (window.confirm("Are you sure?")) {
      navigate("/");
    }
  };

  return (
    <div className="story-details-body">
      <Navbar />
      <div className="container-fluid my-5">
        <div className="row">
          <div className="col-md-8 mx-auto">
          <div 
            className="card p-4 mb-4 darkmodefor" 
            style={{ backgroundColor: "var(--primary-Color)" }}
          >
            <div className="story-details-header text-center mb-4">
              
              <h2>
                {t("StoryDetails.Story-Details")} :{" "}
                {!id
                  ? t("StoryDetails.Create-a-story")
                  : t("StoryDetails.Update-a-story")}
              </h2>
            </div>

            <div className="row g-4 ">
              <div className="col-md-6">
                <div
                  className="card p-3 darkmodefor"
                  style={{ backgroundColor: "var(--accent-Color)" }}
                >
                  <h4>Story Information</h4>
                  <h6 className="mt-1">Story Name</h6>
                  <div className="input-container mt-2">
                    <input
                      type="text"
                      value={storyTitle}
                      onChange={(event) => setStoryTitle(event.target.value)}
                      placeholder="Enter story name"
                      required
                    />
                  </div>
                  {storyTitleError && (
                    <p className="story-details-error">{storyTitleError}</p>
                  )}

                  <h6 className="mt-3">Description</h6>
                  <div className="textarea-container mt-2">
                    <textarea
                      className="custom-textarea"
                      rows={8}
                      defaultValue={description}
                      onChange={(event) => setDescription(event.target.value)}
                      placeholder="Enter story description"
                      style={{
                        backgroundColor: "var(--primary-Color)",
                        color: "var(--text-Color)",
                      }}
                    ></textarea>
                  </div>
                  <p className="story-details-error">{descriptionError}</p>

                  <h6 className="mt-3">Target Audience</h6>
                  <div className="d-flex gap-3 mt-2">
                    {targetAudiences.map((option) => (
                      <div key={option} className="form-check">
                        <input
                          type="radio"
                          id={`target-${option}`}
                          name="targetAudience"
                          value={option}
                          checked={targetAudience === option}
                          onChange={() => setTargetAudience(option)}
                          className="form-check-input"
                        />
                        <label
                          htmlFor={`target-${option}`}
                          className="form-check-label"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                  {targetAudienceError && (
                    <p className="story-details-error">{targetAudienceError}</p>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <div
                  className="card p-3 darkmodefor"
                  style={{ backgroundColor: "var(--accent-Color)" }}
                >
                  <h5>Add Cover</h5>
                  <h6>Upload Section</h6>
                  <label
                    className="custum-file-upload mt-2"
                    htmlFor="file-upload"
                  >
                    {uploadedImageUrl ? (
                      <UploadButton
                        uploader={uploader}
                        options={options}
                        onComplete={(files) => {
                          setUploadedImageUrl(files[0]?.fileUrl);
                        }}
                      >
                        {({ onClick }) => (
                          <div onClick={onClick} style={{ cursor: "pointer" }}>
                            <img
                              src={uploadedImageUrl}
                              alt="Uploaded Cover"
                              className="img-fluid-cover"
                            />
                          </div>
                        )}
                      </UploadButton>
                    ) : (
                      <>
                        <UploadButton
                          uploader={uploader}
                          options={options}
                          onComplete={(files) => {
                            setUploadedImageUrl(files[0]?.fileUrl);
                          }}
                        >
                          {({ onClick }) => (
                            <div
                              className="icon"
                              onClick={onClick}
                              style={{ cursor: "pointer" }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="rgba(75, 85, 99, 1)"
                                  d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                                ></path>
                              </svg>
                            </div>
                          )}
                        </UploadButton>
                        <div className="text">
                          <span>Click to upload image</span>
                        </div>
                      </>
                    )}
                  </label>
                  {uploadedImageUrlError && (
                    <p className="story-details-error">
                      {uploadedImageUrlError}
                    </p>
                  )}

                  <h6 className="mt-3">Background</h6>
                  <div className="d-flex align-items-center gap-2 mt-2">
                    <div className="color-picker-wrapper">
                      <button
                        className="color-picker-btn"
                        onClick={() =>
                          setShowColorPickerBackground(
                            !showColorPickerBackground
                          )
                        }
                      >
                        <div
                          className="rounded-circle border color-circle"
                          style={{ backgroundColor: backgroundColor }}
                        ></div>
                        <span>{backgroundColor}</span>
                      </button>
                    </div>
                  </div>

                  {showColorPickerBackground && (
                    <div className="color-picker-container">
                      {colors.map((color) => (
                        <div
                          key={color}
                          className="color-picker-item"
                          style={{ backgroundColor: color }}
                          onClick={() => {
                            setBackgroundColor(color);
                            setShowColorPickerBackground(false);
                          }}
                        ></div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <div
                  className="card p-3 darkmodefor"
                  style={{ backgroundColor: "var(--accent-Color)" }}
                >
                  <h4>More Information</h4>
                  <div className="d-flex align-items-center gap-3">
                    <div className="flex-grow-1">
                      <h6 className="mt-1">Language</h6>
                      <div className="input-container mt-2">
                        <select
                          className="custom-select-Language"
                          value={language} 
                          onChange={(event) => setLanguage(event.target.value)}
                          required
                        >
                          <option
                            value=""
                            disabled
                            className="placeholder-option"
                          >
                            Select Language
                          </option>
                          {languages.map((lang) => (
                            <option key={lang} value={lang} className="darkmodefor" >
                              {lang}
                            </option>
                          ))}
                        </select>
                      </div>
                      {languageError && (
                        <p className="story-details-error">{languageError}</p>
                      )}
                    </div>

                    <div className="flex-grow-1">
                      <h6 className="mt-1">Number of Slides</h6>
                      <div className="input-container mt-2">
                        <input
                          type="number"
                          value={numberOfSlides}
                          onChange={(event) =>
                            setNumberOfSlides(event.target.value)
                          }
                          min="1"
                          placeholder="Enter number of slides"
                          required
                          className="number-input"
                        />
                      </div>
                    </div>
                  </div>

                  <h6 className="mt-2">Characters</h6>
                  <div className="input-container mt-1">
                    <input
                      type="text"
                      value={mainCharactersHelper}
                      onChange={(event) =>
                        setMainCharactersHelper(event.target.value)
                      }
                      placeholder="Add a character"
                      required
                    />
                    <button
                      className="add-btn"
                      onClick={() =>
                        handaleMainCharacters(mainCharactersHelper)
                      }
                    >
                      Add
                    </button>
                  </div>
                  {mainCharactersError && (
                    <p className="story-details-error">{mainCharactersError}</p>
                  )}
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {mainCharacters.map((char, idx) => (
                      <div key={idx} className="character-box">
                        <span>{char}</span>
                        <button
                          onClick={() => handelDelete(setMainCharacters, idx)}
                        >
                          ✖
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card p-3 category-card darkmodefor">
                  <h4>Category</h4>
                  <h6>Story Category</h6>
                  <div className="input-container1 mt-2 position-relative">
                    <button
                      className="dropdown-toggle w-100 text-start "
                      type="button"
                      onClick={() => setShowCategoryPicker(!showCategoryPicker)}
                    >
                      Select
                    </button>
                    {showCategoryPicker && (
                      <div className="dropdown-menu1 show p-2 position-absolute category-dropdown">
                        <div className="grid-container">
                          {categorys.map((cat) => (
                            <div
                              key={cat}
                              className={`m-1 p-2 border rounded text-center category-item ${
                                category.includes(cat)
                                  ? "selected-category"
                                  : "bg-light"
                              }`}
                              onClick={() => handleCategoryToggle(cat)}
                            >
                              {cat}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  {categoryError && (
                    <p className="story-details-error ">{categoryError}</p>
                  )}
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {category.map((cat) => (
                      <div key={cat} className="character-box1 ">
                        <span>{cat}</span>
                        <button
                          onClick={() =>
                            handelDelete(setCategory, category.indexOf(cat))
                          }
                        >
                          ✖
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="row justify-content-end ">
              <div className="col-auto ">
                <button
                  className="btnStartAndCancel "
                  onClick={handalStartWriting}
                >
                  Start
                </button>
                <button className="btnStartAndCancel" onClick={handelCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default StoryDetails;
