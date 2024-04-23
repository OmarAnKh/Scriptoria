import "./StoryDetails.css";
import React, { useState } from 'react';
import Languege from "./details-in-forms/Languege";
import TargetAudience from "./details-in-forms/TargetAudience";
import Category from "./details-in-forms/Category";
import LabelOfStory from "./details-in-forms/LabelOfStory";
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import { story } from "../../api/storyAPI";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAuth from "../../hooks/useAuth";
const uploader = Uploader({
  apiKey: "free"
});

const options = { multi: true };


const StoryDetails = () => {
  const { auth } = useAuth();
  const { t } = useTranslation()
  const htmlForStory = ["inputCity", "inputPassword4", "", "inputAddress2", "character-background-color"];
  const typeofStory = ["text", "number", "color", "textarea"];
  const nameOfDetails = [t("StoryDetails.title"), t("StoryDetails.number"), t("StoryDetails.description"), t("StoryDetails.characters"), t("StoryDetails.background")];
  const placeholderOfForm = [t("StoryDetails.untitled"), "1", "", t("StoryDetails.name"),];
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [MainCharacters, setMainCharacters] = useState([]);
  const [language, setLanguage] = useState("");
  const [TargetAudiences, setTargetAudiences] = useState("");
  const [background, setBackground] = useState("#000000");
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [Categorys, setCategorys] = useState([]);
  const [mainCharactersList, setMainCharactersList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const startWritingHandler = async (event) => {
    event.preventDefault();
    if (!uploadedImageUrl) {
      setErrorMessage('Please upload a cover image.');
      return;
    }

    const storyData = {
      title: title,
      description: description,
      language: language,
      MPAFilmRatings: TargetAudiences,
      genres: Categorys,
      backgroundColor: background,
      coverPhoto: uploadedImageUrl,
      mainCharacters: mainCharactersList
    };

    const res = await story("story", storyData, auth.token);
    navigate(`/WritingPage`);
  };

  const handleChange = (event) => {
    const selectedCategory = event.target.value;
    setCategorys([...Categorys, selectedCategory]);
    displayCategorys(selectedCategory);
  };

  const handleDelete = (indexToRemove) => {
    setCategorys((prevCategorys) => {
      let newCategorys = [...prevCategorys];
      newCategorys.splice(indexToRemove, 1);
      return newCategorys;
    });
  };

  const displayCategorys = () => {
    return Categorys.map((category, index) => (
      <div className="displayDivInCategory" key={index}>
        <p className="pInBorderInCategory">{category}</p>
        <button onClick={() => handleDelete(index)} className="buttonInCategory">X</button>
      </div>
    ));
  };

  const handleDeleteMainCharacter = (indexToRemove, event) => {
    event.preventDefault();
    setMainCharactersList((prevCharacters) => {
      let newCharacters = [...prevCharacters];
      newCharacters.splice(indexToRemove, 1);
      return newCharacters;
    });
  };

  const addMainCharacter = (event) => {
    event.preventDefault();
    if (MainCharacters.trim() !== "") {
      setMainCharactersList([...mainCharactersList, MainCharacters]);
      setMainCharacters("");
    }
  };

  const displayMainCharacters = () => {
    return mainCharactersList.map((character, index) => (
      <div className="displayDiv" key={index}>
        <div className="borderContainer">
          <p className="pInBorder">{character}</p>
          <button onClick={(event) => handleDeleteMainCharacter(index, event)} className="buttonInCategory">X</button>
        </div>
      </div>
    ));
  };
  const handleCancel = () => {
    const isConfirmed = window.confirm('Are you sure you want to cancel? You will be returned to the homepage without saving data.');

    if (isConfirmed) {
      navigate(`/`);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container " style={{ marginTop: "3%", marginBottom: "3%" }}>
        <div className="container  story">
          <form
            className="row g-3"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
              }
            }}
            onSubmit={startWritingHandler}
          >
            <div className="row justify-content-start">
              <div className="col-md-6 title">
                <LabelOfStory htmlFor={htmlForStory[0]} type={typeofStory[0]} name={nameOfDetails[0]} placeholder={placeholderOfForm[0]} method={setTitle} />
              </div>
              <Languege method={setLanguage} />
            </div>

            <div className="mb-3 description">
              <LabelOfStory htmlFor={htmlForStory[2]} type={typeofStory[3]} name={nameOfDetails[2]} method={setdescription} />
            </div>

            <div className="row justify-content-between mainAndBack">
              <div className="col-4">
                <LabelOfStory htmlFor={htmlForStory[3]} type={typeofStory[0]} name={nameOfDetails[3]} placeholder={placeholderOfForm[3]} method={setMainCharacters} />
              </div>
              <div className="col d-flex align-items-center Plus">
                <button onClick={(event) => addMainCharacter(event)}>+</button>
              </div>
              <div className="col-4 justify-content-end back">
                <LabelOfStory htmlFor={htmlForStory[4]} type={typeofStory[2]} name={nameOfDetails[4]} method={setBackground} />
              </div>
            </div>
            {displayMainCharacters()}

            <div className="row justify-content-between">
              <Category handleChange={handleChange} displayCategorys={displayCategorys} method={setCategorys} />
              <TargetAudience method={setTargetAudiences} />

              <div className="row justify-content-end imageAndButton">
                <div className="card" style={{ width: '15rem', height: "23rem" }}>
                  {uploadedImageUrl ? (
                    <img src={uploadedImageUrl} alt="Uploaded Cover" className="uploaded-cover" />
                  ) : (
                    <UploadButton
                      uploader={uploader}
                      options={options}
                      onComplete={files => {
                        setUploadedImageUrl(files[0].fileUrl);
                        setErrorMessage('');
                      }}
                    >
                      {({ onClick }) => (
                        <button type="button" className="button1" onClick={onClick}>
                          {t("StoryDetails.add_cover")}
                        </button>
                      )}
                    </UploadButton>
                  )}
                </div>

                <div className="buttons-container mb-5">
                  {errorMessage && <p className="error-message">{errorMessage}</p>}
                  <button id="button2" className="btn btn-primary btn-lg" type="submit">{t("StoryDetails.start")}</button>
                  <button id="cancel-button" className="btn btn-secondary btn-lg" onClick={handleCancel}>{t("StoryDetails.cancel")}</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StoryDetails;