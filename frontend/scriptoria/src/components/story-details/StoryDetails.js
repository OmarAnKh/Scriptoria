import "./StoryDetails.css";
import React, { useState } from 'react';
import Languege from "./details-in-forms/Languege";
import TargetAudience from "./details-in-forms/TargetAudience";
import Category from "./details-in-forms/Category";
import LabelOfStory from "./details-in-forms/LabelOfStory";
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import { story } from "../../api/storyAPI";
import Cookies from "js-cookie";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

const uploader = Uploader({
  apiKey: "free"
});

const options = { multi: true };
const htmlForStory = ["inputCity", "inputPassword4", "", "inputAddress2", "character-background-color"];
const typeofStory = ["text", "number", "color", "textarea"];
const nameOfDetails = ["Title", "Number of slides", "description (300 word max)", "Main Characters", "Background color:"];
const placeholderOfForm = ["Untitled", "1", "", "name"];

const StoryDetails = () => {
  const [title, setTitle] = useState("");
  const [numberOfSlides, setNumberOfSlides] = useState("");
  const [description, setdescription] = useState("");
  const [MainCharacters, setMainCharacters] = useState([]);
  const [language, setLanguage] = useState("");
  const [TargetAudiences, setTargetAudiences] = useState("");
  const [background, setBackground] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [Categorys, setCategorys] = useState([]);
  const [mainCharactersList, setMainCharactersList] = useState([]);

  const startWritingHandler = async (event) => {
    event.preventDefault();
    const storyData = {
      title: title,
      description: description,
      language: language,
      MPAFilmRatings: TargetAudiences,
      genres: Categorys,
      backgroundColor: background,
      coverPhoto: uploadedImageUrl,
      mainCharacters: MainCharacters
    };
    const res = await story("story", storyData, Cookies.get("token"));
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
  return (
    <div>
      <Navbar />
      <div className="container ">
        <p className="parg">story Details</p>
        <div className="container  story">
          <form
            className="row g-3"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
              }
            }}
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
                        alert(files.map(x => x.fileUrl).join("\n"));
                      }}
                    >
                      {({ onClick }) => (
                        <button type="button" className="button1" onClick={onClick}>
                          Add Cover
                        </button>
                      )}
                    </UploadButton>
                  )}
                </div>
                <div className="buttons-container">
                  <button id="button2" className="btn btn-primary btn-lg" onClick={(event) => { startWritingHandler(event) }}>Start Writing</button>
                  <button id="cancel-button" className="btn btn-secondary btn-lg">Cancel</button>
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
