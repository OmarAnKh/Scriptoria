import React, { useState } from "react";
import "./WritingPage.css";
import WpNavBar from "./nav-bar/WpNavBar";
import TextEditor from "./text-editor/TextEditor";

const WritingPage = () => {
  const [zen, setZen] = useState(false);
  const [data, setData] = useState('');

  // const setMode = () => {
  //   setZen(!zen);
  //   document.getElementsByClassName("WpNavBar")[0].style = {
  //     backgroundColor: zen ? "black" : "#DEE2FF",
  //   };
  // };

  const [model, setModel] = useState(() => {
    const data = localStorage.getItem("savedHtml");
    return data;
  });

  // const body = document.body;
  // const html = document.documentElement;
  // const height = Math.max(
  //   body.scrollHeight,
  //   body.offsetHeight,
  //   html.clientHeight,
  //   html.scrollHeight,
  //   html.offsetHeight
  // );


  return (
    <div className="WP">
      {/* <WpNavBar setMode={setMode} data={data} setData={setData} /> */}
      <WpNavBar data={data} setData={setData} />
        <div
        className="focus"
        style={{
          // backgroundColor: zen ? "#25252585" : "#F6F9FE",
          // height,
          transition: "all 0.3s ease-in",
        }}
      >
        <TextEditor mode={model} setModel={setModel} data={data} setData={setData} />
      </div>
    </div>
  );
};

export default WritingPage;
