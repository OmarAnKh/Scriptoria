import React from "react";
import "./WpNavBar.css";
import Logo from "../../../img/scriptoria-logo.png";
import { Link } from "react-router-dom";
import 'froala-editor/js/froala_editor.pkgd.min.js';
import LinkBtns from "./LinkBtns";
import Buttons from "./Buttons";

const WpNavBar = ({ setMode, data, setData }) => {

  const saveData = ()=>{
    console.log(localStorage.getItem('story'))
  }

  const handleMode = () => {
    setMode();
  };
  return (
<nav className="navbar navbar-expand-lg WpNavBar py-1" id="WpNavBar">
  <div className="container-fluid d-flex justify-content-between">
    <Link to={`/`} className="card-text d-flex align-items-center" target="">
      <img className="logo-size" src={Logo} alt="no"></img>
      <div className="d-none d-md-block">
        <span className="Scriptoria ourbtn fs-2 py-0 px-0">Scriptoria</span>
      </div>
    </Link>

    <button
      className="navbar-toggler order-1 order-lg-2"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavDropdown"
      aria-controls="navbarNavDropdown"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>

    <div className="d-flex order-lg-2">
      <ul className="nav flex-nowrap align-items-center ms-sm-3 list-unstyled ">

        {/* invitation button */}
      <li className="nav-item invitation m-2">
            <div>
                <button className="bi bi-envelope-paper btn btn-outline-dark rounded-5 m-1" data-bs-toggle="modal" data-bs-target="#Invitation-modal"></button>
                <div className="modal fade" id="Invitation-modal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="row justify-content-end mx-0">
                                <button type="button" className="btn-close m-2" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body container fs-1">
                                <div className="row star-widget row-cols-auto justify-content-center">
                                   
                                </div>
                                <div className='row rate-msg fs-5 justify-content-center text-secondary'>
                                    Do You Want To Invite Someone to Write With You?
                                    {/* do whatever u need here, if u want to change anything change the classNames */}
                                </div>
                            </div>
                            <div className="container gap-2 btn-group mb-2">
                              {/* the first one so u can send the invitation, the second one to cancel and close the modal */}
                                <button type="button" className="btn btn-primary rounded" data-bs-dismiss="modal" >yes</button> 
                                <button type="button" className="btn btn-secondary rounded" data-bs-dismiss="modal">no</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </li>

        {/* chat button */}
        <li className="nav-item chat m-2">
          <LinkBtns btnCn="Chats" icon="bi bi-chat-left-text-fill" badge={15} badgeMsg="unread messeges" />
        </li>
        {/* notifications button */}
        <li className="nav-item notifications m-2">
          <LinkBtns btnCn="Notifications" icon="bi bi-bell-fill" badge={55} badgeMsg="unread notifications" />
        </li>
        {/* profile button */}
        <li className="nav-item pfp m-2">
          <LinkBtns btnCn="Profile" icon="bi bi-emoji-angry-fill" badge={0} />
        </li>
      </ul>
    </div>

    <div className="collapse navbar-collapse text-center order-2 order-lg-1" id="navbarNavDropdown">
      <ol className="navbar-nav mx-auto">
        <li className="nav-item">
          <Buttons btnCN="saveBtn" method={saveData} name="Save" />
        </li>
        <li className="nav-item">
          {/* <Buttons btnCN="FocusMode" method={handleMode} name="Focus Mode" /> */}
          <Buttons btnCN="FocusMode" name="Focus Mode" />
        </li>
        <li className="nav-item">
          <button type="button" className="btn btn-outline-dark rounded-5 m-2">
            Publish
          </button>
        </li>
      </ol>    
    </div>
  </div>
</nav>

  );
};

export default WpNavBar;
