import React, { useState } from 'react';
import './WritingPage.css';
import WpNavBar from './nav-bar/WpNavBar';
import TextEditor from './text-editor/TextEditor';




const WritingPage = () => {

  const [zen, setZen] = useState(false)

  const setMode = () => {
    setZen(!zen)
    document.getElementById('WpNavBar').style={
      backgroundColor : zen? 'navy' : '#DEE2FF'
    }
  }



  const [model, setModel] = useState(() => {
    const data = localStorage.getItem('savedHtml')
    return data
  })

  const body = document.body;
  const html = document.documentElement;
  const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

  console.log(model)

  return (
    <>
    <WpNavBar setMode={setMode} />
    <div className='focus mt-lg-4 mt-sm-4' style={{ backgroundColor: zen ? '#25252585' : '#F6F9FE',height , transition: "all 0.3s ease-in" }}>
    <TextEditor mode={model} setModel={setModel} />
      
    </div>
    </>

  )
}



export default WritingPage;
