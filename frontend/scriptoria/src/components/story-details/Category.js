import React from 'react'

function Category() {
  return (
    <div className="col-md-6 Category">
      <label className="form-label">Category</label>
      <select id="inputState" className="form-select">
        <option selected>select one/more</option>
        <option value="14">Action</option>
        <option value="11">Adventure</option>
        <option value="24">ChickLit</option>
        <option value="6">Fanfiction</option>
        <option value="3">Fantasy</option>
        <option value="21">General Fiction</option>
        <option value="23">Historical Fiction</option>
        <option value="9">Horror</option>
        <option value="7">Humor</option>
        <option value="8">Mystery / Thriller</option>
        <option value="16">Non-Fiction</option>
        <option value="12">Paranormal</option>
        <option value="2">Poetry</option>
        <option value="19">Random</option>
        <option value="4">Romance</option>
        <option value="5">Science Fiction</option>
        <option value="17">Short Story</option>
        <option value="13">Spiritual</option>
        <option value="1">Teen Fiction</option>
        <option value="18">Vampire</option>
        <option value="22">Werewolf</option>
      </select>
    </div>
  )
}

export default Category
