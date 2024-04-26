import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';
import "./StoryDetails.css";
import { UploadButton } from 'react-uploader';
import { Uploader } from "uploader";
import { targetAudiences, languages, categorys } from "./selectsArray"
import { story } from "../../api/storyAPI";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAuth from "../../hooks/useAuth";
import { getDocumentByUsingParams, updateDocument } from '../../api/API\'s';
import { Buffer } from 'buffer';


const StoryDetailsOption = ({ options, title, method, disabled, value, error }) => {
  const handleChange = (event) => {
    method(event.target.value)
  }
  return (
    <div className="col row">
      <div className="col">
        <label >{title}</label>
        <select className="form-control story-details-card-input" onChange={(event) => handleChange(event)} value={value} disabled={disabled}>
          {options.map(option => {
            return (
              <option value={option} key={option}>{option}</option>
            );
          })}
        </select>
        <p className='story-details-error'>{error}</p>
      </div>
    </div>
  )
}

const StoryDetailsInput = (props) => {
  const handleChange = (event) => {
    props.method(event.target.value);
  }
  return (
    <div className={props?.className}>
      <label>{props?.title}</label>
      <input className="form-control" type={props?.type} style={props?.style} defaultValue={props.defaultValue} onChange={(event) => handleChange(event)} name={props.name} />
      <p className='story-details-error'>{props.error}</p>
    </div>
  )
}


const uploader = Uploader({
  apiKey: "free"
});

const options = { multi: true };


const StoryDetails = () => {

  const { id } = useParams()
  const { auth } = useAuth();
  const { t } = useTranslation()
  const [storyTitle, setStoryTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [mainCharacters, setMainCharacters] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState("#6C5DA7");
  const [category, setCategory] = useState([]);
  const [targetAudience, setTargetAudience] = useState("")
  const [mainCharactersHelper, setMainCharactersHelper] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  const [storyTitleError, setStoryTitleError] = useState("");
  const [languageError, setLanguageError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [mainCharactersError, setMainCharactersError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [targetAudienceError, setTargetAudienceError] = useState("");
  const [uploadedImageUrlError, setUploadedImageUrlError] = useState("");

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
      const cover = Buffer.from(story.coverPhoto).toString('base64');
      setUploadedImageUrl(`data:image/png;base64,${cover}`);
    }
    if (id) {
      fetchData();
    }
  }, [])

  const handaleMainCharacters = (value) => {
    if (value === "") {
      return
    }
    setMainCharacters((prev) => {
      return [...prev, value]
    })
  }

  const handalCategory = (value) => {
    const isCategory = category.find((categoryValue) => value === categoryValue)
    if (isCategory) {
      return
    }
    setCategory((prev) => {
      return [...prev, value]
    })
  }

  const handelDelete = (method, idx) => {
    method((prev) => {
      let newArray = [...prev];
      newArray.splice(idx, 1);
      return newArray
    })
  }

  const handalStartWriting = async () => {
    let isGoTo = true;
    if (storyTitle === "") {
      setStoryTitleError(t("StoryDetails.title-error"));
      isGoTo = (false);
    } else {
      setStoryTitleError("")
    }
    if (language === "") {
      setLanguageError(t("StoryDetails.language-error"));
      isGoTo = (false);
    } else {
      setLanguageError("")
    }
    if (description === "") {
      setDescriptionError(t("StoryDetails.description-error"));
      isGoTo = (false);
    }
    if (mainCharacters.length === 0) {
      console.log("ok");
    }
    if (category.length === 0) {
      setCategoryError(t("StoryDetails.category-error"));
      isGoTo = (false);
    } else {
      setCategoryError("")
    }
    if (targetAudience === "") {
      setTargetAudienceError(t("StoryDetails.target-audience-error"));
      isGoTo = (false);
    } else {
      setTargetAudienceError("")
    }
    if (!uploadedImageUrl) {
      setUploadedImageUrlError(t("StoryDetails.uploaded-image-url-error"));
      isGoTo = (false);
    } else {
      setUploadedImageUrlError("")
    }
    if (!isGoTo) {
      isGoTo = true;
      return
    }
    if (id) {
      const storyData = {
        id
      }
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
      const cover = Buffer.from(oldStory.coverPhoto).toString('base64');
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
      mainCharacters: mainCharacters
    };
    const res = await story("story", storyData, auth.token);
    navigate(`/WritingPage/${res.story._id}`);
  }

  const handelCancel = () => {
    if (window.confirm("Are you sure?")) {
      navigate("/");
    }
  }

  return (
    <div className="story-details-body">
      <Navbar />
      <div className="container-fluid my-5">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <div className="story-details-header text-center">
              <span className="story-details-title text-center">Story Details:{!id ? "Create a story" : "Update a story"}</span>
            </div>
            <div className='story-details-inner-body p-5'>
              <div className="row">
                <StoryDetailsInput className="col-md-8" title={`${t("StoryDetails.title")} *`} defaultValue={storyTitle} type="text" method={setStoryTitle} error={storyTitleError} />
                <div className="col-md-4">
                  <StoryDetailsOption title={`${t("StoryDetails.language")} *`}
                    options={languages}
                    method={setLanguage}
                    value={language}
                    error={languageError}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label>{t("StoryDetails.description")} *</label>
                  <textarea
                    className="form-control"
                    rows={10}
                    defaultValue={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                  <p className='story-details-error'>{descriptionError}</p>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <div className="d-flex">
                    <StoryDetailsInput className="col-md-4" title={t("StoryDetails.characters")} defaultValue={""} type="text" method={setMainCharactersHelper} error={mainCharactersError} />
                    <div className="col-md-4 align-self-center mx-2 my-4">
                      <button className='btn btn-primary ml-2' style={{ backgroundColor: "#AC967F" }} onClick={() => handaleMainCharacters(mainCharactersHelper)}>+</button>
                    </div>
                    <StoryDetailsInput className="col-md-4 d-flex align-items-center "
                      title={t("StoryDetails.background")} type="color"
                      style={{ width: '30px', height: '30px', padding: '0' }}
                      method={setBackgroundColor}
                      name="character-background-color"
                      defaultValue={"#6C5DA7"}
                    />
                  </div>
                </div>
              </div>
              <div>
                <ul className='list-group'>
                  {
                    mainCharacters.map((mainCharacter, idx) => {
                      return (
                        <div key={idx} className="d-flex align-items-center rounded p-1">
                          <li className='list-group-item' style={{ width: "200px", wordBreak: "break-word" }}>{mainCharacter}</li>
                          <button className='btn mx-1 py-1' style={{ backgroundColor: "#AC967F" }} onClick={() => handelDelete(setMainCharacters, idx)}>X</button>
                        </div>
                      )
                    })
                  }
                </ul>
              </div>
              <div className='row mt-3 d-flex justify-content-between'>
                <div className="col-md-4">
                  <StoryDetailsOption title={`${t("StoryDetails.category")} *`}
                    options={categorys}
                    value={""}
                    method={handalCategory}
                    error={categoryError}
                  />
                  <p className='settings-error'></p>
                </div>
                <div className="col-md-4">
                  <StoryDetailsOption title={`${t("StoryDetails.Target")} *`}
                    options={targetAudiences}
                    method={setTargetAudience}
                    value={targetAudience}
                    error={targetAudienceError}
                  />
                  <p className='settings-error'></p>
                </div>
              </div>
              <div>
                <ul className='list-group'>
                  {
                    category.map((category, idx) => {
                      return (
                        <div key={idx} className="d-flex align-items-center rounded p-1">
                          <li className='list-group-item' style={{ width: "200px", wordBreak: "break-word" }}>{category}</li>
                          <button className='btn mx-1 py-1' style={{ backgroundColor: "#AC967F" }} onClick={() => handelDelete(setCategory, idx)}>X</button>
                        </div>
                      )
                    })
                  }
                </ul>
              </div>
              <div className='row justify-content-end'>
                <div className="col-md-4 d-flex justify-content-center  flex-column">
                  <div className="mt-2 text-center">
                    <UploadButton
                      uploader={uploader}
                      options={options}
                      onComplete={files => {
                        setUploadedImageUrl(files[0]?.fileUrl);
                      }}
                    >
                      {({ onClick }) => (
                        <button type="button" className='btn btn-secondary' onClick={onClick} style={{ backgroundColor: "#AC967F" }}>
                          {t("StoryDetails.add_cover")} *
                        </button>
                      )}
                    </UploadButton>
                    <p className='story-details-error'>{uploadedImageUrlError}</p>
                    <div className="card" style={{ width: '15rem', height: "23rem" }}>
                      {uploadedImageUrl && <img src={uploadedImageUrl} alt="Uploaded Cover" className="uploaded-cover" />}
                    </div>
                  </div>
                </div>
              </div>
              <div className='row justify-content-end my-5'>
                <div className="col-auto">
                  <button className='btn btn-secondary mx-2' style={{ backgroundColor: "#AC967F" }} onClick={handalStartWriting}>{t("StoryDetails.start")}</button>
                  <button className='btn btn-secondary' style={{ backgroundColor: "#E1D8D1" }} onClick={handelCancel}>{t("StoryDetails.cancel")}</button>
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