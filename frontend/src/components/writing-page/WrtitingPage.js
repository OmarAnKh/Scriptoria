import React, { useEffect, useState } from "react";
import "./WritingPage.css";
import WpNavBar from "./nav-bar/WpNavBar";
// import TextEditor from "./text-editor/TextEditor";
import { io } from "socket.io-client";
import useAuth from "../../hooks/useAuth";
import SlidesPage from "./text-editor/SlidesPage";


const WritingPage = () => {
  const [focus, setFocus] = useState(false);
  const [data, setData] = useState('');
  const [state, setState] = useState(false)
  const [socket, setSocket] = useState()
  const [flag, setFlag] = useState(false)
  const { auth } = useAuth()

  useEffect(() => {
    const s = io(process.env.REACT_APP_HOSTURL)
    setSocket(s)

    return () => {
      s.disconnect()
    }
  }, [])

  useEffect(() => {
    if (socket == null) return
    socket.emit("joinWritingPage", auth?.userInfo._id)
  }, [socket])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const setMode = () => {
    setFocus(!focus);
  };


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
    <>
      <WpNavBar socket={socket} data={data} setMode={setMode} setData={setData} setState={setState} />
      <div className="WP" style={{
        backgroundColor: focus ? "#25252585" : "#ECECEC",
        height,
        transition: "all 0.3s ease-in",
      }}>

        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>

        <SlidesPage socket={socket} />
      </div>
    </>

  );
};

export default WritingPage;