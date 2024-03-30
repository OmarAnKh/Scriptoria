import React from 'react'

function LabelOfStory(props) {
  const changeHandler = (event) => {
    props.method(event.target.value)

}
  if(props.type==="text"||props.type==="number"){
    return (
      <div>
           <label htmlFor={props.htmlFor} className="form-label">{props.name}</label>
    <input type={props.type} className="form-control" onChange={changeHandler} placeholder={props.placeholder} />
      </div>
      
    )
  }
   else if(props.type==="color"){
     return(
      <div>
         <label htmlFor={props.htmlFor} className="form-label back" >{props.name}</label>
    <input type={props.type} onChange={changeHandler} name="character-background-color"/>
      </div>
     )
   }
   else{
    return(
      <div>
 <label htmlFor={props.htmlFor}  className="form-label">{props.name}</label>
  <textarea  className="form-control" onChange={changeHandler}  rows={3} defaultValue={""} />
      </div>
    )
   }
  
 
}

export default LabelOfStory
