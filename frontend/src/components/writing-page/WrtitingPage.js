import React, { useEffect, useState } from "react";
import "./WritingPage.css";
import WpNavBar from "./nav-bar/WpNavBar";
import TextEditor from "./text-editor/TextEditor";
import { io } from "socket.io-client";
import useAuth from "../../hooks/useAuth";


const WritingPage = () => {
  const [zen, setZen] = useState(false);
  const [data, setData] = useState('');
  const [state, setState] = useState(false)
  const [socket, setSocket] = useState()
  const [flag, setFlag] = useState(false)
  const { auth } = useAuth()

  useEffect(() => {
    const s = io("http://localhost:5000")
    setSocket(s)

    return () => {
      s.disconnect()
    }
  }, [])

  useEffect(() => {
    if (socket == null) return
    socket.emit("joinWritingPage", auth?.userInfo._id)
  }, [socket])

  const setMode = () => {
    setZen(!zen);
    document.getElementsByClassName("WpNavBar")[0].style = {
      backgroundColor: zen ? "black" : "#DEE2FF",
    };
  };

  const [model, setModel] = useState(() => {
    const data = localStorage.getItem("savedHtml");
    return data;
  });

  const body = document.body;
  const html = document.documentElement;
  const height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );


  return (
    <div className="WP">
      <WpNavBar socket={socket} data={data} setMode={setMode} setData={setData} setState={setState} />
      <div

        className="focus"
        style={{
          backgroundColor: zen ? "#25252585" : "#F6F9FE",
          height,
          transition: "all 0.3s ease-in",
        }}
      >
        <TextEditor socket={socket} mode={model} setModel={setModel} data={data} setData={setData} state={state} />
      </div>
    </div>
  );
};

export default WritingPage;