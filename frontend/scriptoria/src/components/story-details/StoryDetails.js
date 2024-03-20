import "./StoryDetails.css";

import React, { useState } from 'react'
import Languege from "./Languege";
import TargetAudience from "./TargetAudience";
import Category from "./Category";

const StoryDetails = () => {

  return (

    <div>
      <div className="container">
        <p className="parg">story Details</p>
        <div className="container story">
          <div className="container">
            <div className="container">
              <form className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="inputCity" className="form-label">Title</label>
                  <input type="text" className="form-control" id="inputCity" placeholder="Untitled" />
                </div>
                <div className="col-md-6 justify-content-start NumberOfSlide">
                  <label htmlFor="inputPassword4" className="form-label">Number of slides</label>
                  <input type="number" className="form-control" name="num-slides" defaultValue={1} />
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">description (300 word max)</label>
                  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div className="col-6">
                  <label htmlFor="inputAddress2" className="form-label">Main Characters</label>
                  <input type="text" className="form-control" id="inputAddress2" placeholder="Name" />
                </div>
                <Languege />
                <TargetAudience />
                <Category />
                <div className="col-md-3">
                  <label className="back" htmlFor="character-background-color">Background color:</label>
                  <input type="color" id="character-background-color" name="character-background-color" />
                </div>
                <div className="col-md-6 Add-cover">
                  <button className="button button1">Add Cover</button>
                </div>
                <div>
                  <button className="button2" classname="btn btn-primary btn-lg " >Start Writing</button>
                  <button className="cancel-button" classname="btn btn-secondary btn-lg " >Cancel</button>
                </div>
                <div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default StoryDetails;




