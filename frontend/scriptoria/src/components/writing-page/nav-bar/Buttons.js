import React from 'react'

const Buttons = ({btnCN, method, name}) => {
    const functionCall = ()=>{
        method()
    }
  return (
    <button
                type="button"
                className={`${name} btn btn-outline-dark rounded-5 m-2`}
                onClick = {functionCall}
              >
                {name}
              </button>
  )
}

export default Buttons