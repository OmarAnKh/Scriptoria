import React from 'react'

function LabelOfStory(props) {
  const changeHandler = (event) => {
    props.method(event.target.value)

}
  if(props.type==="text"){
    return (
      <div>
           <label htmlFor={props.htmlFor} className="form-label" >{props.name}</label>
    <input type={props.type} className="form-control" onChange={changeHandler} placeholder={props.placeholder} required />
      </div>
      
    )
  }
   else if(props.type==="color"){
     return(
      <div>
         <label htmlFor={props.htmlFor} className="form-label" >{props.name}</label>
    <input type={props.type} onChange={changeHandler} name="character-background-color" required />
      </div>
     )
   }
   else{
    return(
      <div>
 <label htmlFor={props.htmlFor}  className="form-label">{props.name}</label>
  <textarea  className="form-control textarea-full-width" onChange={changeHandler}  rows={5} defaultValue={""} required/>
      </div>
    )
   }
  
}

export default LabelOfStory
