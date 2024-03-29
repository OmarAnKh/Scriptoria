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
  const [MainCharacters, setMainCharacters] = useState("");
  const [language, setLanguage] = useState("");
  const [TargetAudiences, setTargetAudiences] = useState("");
  const [background, setBackground] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [Categorys, setCategorys] = useState([]);

  const startWritingHandler = async (e) => {
    e.preventDefault();
    const storyData = {
      title: title,
      description: description,
      language: language,
      MPAFilmRatings: TargetAudiences,
      genres: Categorys,
      backgroundColor: background,
      coverPhoto: uploadedImageUrl
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
      <div className="displayDiv" key={index}>
        <p className="pInBorder">{category}</p>
        <button onClick={() => handleDelete(index)} className="buttonInCategory">X</button>
      </div>
    ));
  };

  return (
    <div>
      <div className="container">
        <p className="parg">story Details</p>
        <div className="container story">
          <form
            className="row g-3"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
              }
            }}
          >
            <div className="col-md-6">
              <LabelOfStory htmlFor={htmlForStory[0]} type={typeofStory[0]} name={nameOfDetails[0]} placeholder={placeholderOfForm[0]} method={setTitle} />
            </div>

            <div className="col-md-6 justify-content-start NumberOfSlide">
              <LabelOfStory htmlFor={htmlForStory[1]} type={typeofStory[1]} name={nameOfDetails[1]} placeholder={placeholderOfForm[1]} method={setNumberOfSlides} />
            </div>

            <div className="mb-3">
              <LabelOfStory htmlFor={htmlForStory[2]} type={typeofStory[3]} name={nameOfDetails[2]} method={setdescription} />
            </div>

            <div className="col-6">
              <LabelOfStory htmlFor={htmlForStory[3]} type={typeofStory[0]} name={nameOfDetails[3]} placeholder={placeholderOfForm[3]} method={setMainCharacters} />
            </div>

            <Languege method={setLanguage} />
            <TargetAudience method={setTargetAudiences} />
            <Category handleChange={handleChange} displayCategorys={displayCategorys} method={setCategorys} />

            <div className="col-md-3">
              <LabelOfStory htmlFor={htmlForStory[4]} type={typeofStory[2]} name={nameOfDetails[4]} method={setBackground} />
            </div>

            <div className="col-md-6 Add-cover">
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
            <div>
              <button id="button2" className="btn btn-primary btn-lg" onClick={(event) => { startWritingHandler(event) }}>Start Writing</button>
              <button id="cancel-button" className="btn btn-secondary btn-lg">Cancel</button>
            </div>

          </form>

        </div>
      </div>
    </div>

  );
};

export default StoryDetails;
