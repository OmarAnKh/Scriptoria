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
    <div className="flex flex-col min-h-screen">
      <WpNavBar socket={socket} data={data} setMode={setMode} setData={setData} setState={setState} />
      <div className="WP flex-1" style={{
        backgroundColor: focus ? "#25252585" : "#ECECEC",
        height: height > 800 ? height : undefined,
        transition: "all 0.3s ease-in",
      }}>
        <div className="main-content" style={{ paddingTop: '6rem' }}>
          <p className={`text-center m-1 ${focus ? "text-light" : ""}`}>Each slide is like a page in the flipbook</p>
          <SlidesPage socket={socket} focus={focus} />
        </div>
      </div>
    </div >
  );
};

export default WritingPage;