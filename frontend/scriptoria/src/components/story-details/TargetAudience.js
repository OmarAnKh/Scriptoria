import React from 'react'

function TargetAudience() {
  return (

    <div className="col-md-6 Target">
      <label className="form-label">Target Audience</label>
      <select id="inputState" className="form-select" >
        <option selected>select one</option>
        <option value="13-18">Young Adult (13-18 years of age)</option>
        <option value="18-25">New Adult (18-25 years of age)</option>
        <option value="25+">Adult (25+ years of age)</option>
      </select>
    </div>

  )
}

export default TargetAudience