import React from "react";
import "./WpNavBar.css";
import Logo from "../../../img/scriptoria-logo.png";
import { Link } from "react-router-dom";
import 'froala-editor/js/froala_editor.pkgd.min.js';

const WpNavBar = ({ setMode, data, setData }) => {

  const saveText = ()=>{
    console.log(localStorage.getItem('story'))
  }

  const handleMode = () => {
    setMode();
  };
  return (
    <nav
      className="navbar navbar-expand-lg WpNavBar py-1 fixed-top"
      id="WpNavBar"
    >
      <div className="container-fluid">
        <Link
          to={`/`}
          className="card-text d-flex align-items-center"
          target=""
        >
          <img className="logo-size py-0" src={Logo} alt="no"></img>
          <div className="d-none d-md-block">
            <a className="Scriptoria ourbtn fs-2 py-0">Scriptoria</a>
          </div>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ol className="navbar-nav mx-auto">
            <li className="nav-item">
              <button
                type="button"
                className="btn btn-outline-dark rounded-5 m-2"
                onClick = {saveText}
              >
                Save
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className="btn btn-outline-dark rounded-5 m-2"
                onClick={handleMode}
              >
                Focus mode
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className="btn btn-outline-dark rounded-5 m-2"
              >
                Publish
              </button>
            </li>
          </ol>
        </div>

        <div className="d-flex order-lg-2">
          <ul className="nav flex-nowrap align-items-center ms-sm-3 list-unstyled ">
            <li className="nav-item chat m-2">
              <Link
                type="button"
                class="Chats btn btn-outline-dark rounded-circle position-relative"
              >
                <i class="bi bi-chat-left-text-fill"></i>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  7<span class="visually-hidden">unread messages</span>
                </span>
              </Link>
            </li>

            <li className="nav-item notifications m-2">
              <Link
                type="button"
                class="Notifications btn btn-outline-dark rounded-circle position-relative"
              >
                <i class="bi bi-bell-fill"></i>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  35
                  <span class="visually-hidden">unread notifications</span>
                </span>
              </Link>
            </li>
            <li className="nav-item pfp m-2">
              <Link
                type="button"
                class="Profile btn btn-outline-dark rounded-circle position-relative"
              >
                <i class="bi bi-emoji-angry-fill"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default WpNavBar;
