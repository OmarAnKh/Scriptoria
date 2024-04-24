import React, { useEffect, useState } from "react";
import "./WpNavBar.css";
import Logo from "../../../img/scriptoria-logo.png";
import { Link } from "react-router-dom";
import 'froala-editor/js/froala_editor.pkgd.min.js';
import LinkBtns from "./LinkBtns";
import Buttons from "./Buttons";
import { findAccount } from "../../../api/accountApi";
import validator from "validator";
import { useParams, useNavigate } from "react-router-dom";
import { deleteDocument, saveDocument, updateDocument } from "../../../api/API's";
import { getWriters } from "../../../api/writers";
import useAuth from "../../../hooks/useAuth";
import { getstory } from "../../../api/storyAPI";
import toast from "react-hot-toast";

const WpNavBar = ({ setMode, data, setData, setState }) => {
  const navigate = useNavigate()
  const { auth } = useAuth()
  const { id } = useParams()
  const [invitedUser, setInvitedUser] = useState("")
  const [invitationError, setInvitationError] = useState("none")
  const [userExistError, setUserExistError] = useState("none")
  const [invaledEmail, setInvaledEmail] = useState("none")
  const [users, setUsers] = useState([])
  const [removeState, setRemoveState] = useState(false) 
  const [addUserState, setAddUserState] = useState(false) 
  const [ruleState, setRuleState] = useState(false) 
  const [signedInUser, setSignedInUser] = useState({})

  useEffect(() => {
    const ExistStory = async () => {
      const res = await getstory(id)
      if (res?.status) {
        navigate('/')
        return
      }
    }
    const fetchUsers = async () => {
      const res = await getWriters(id)
      setUsers(res.users)
      const userExists = res.users?.some(writer => {
        if (writer.AccountId === auth?.userInfo._id) {
          setSignedInUser(writer)
          if (writer.rule === "viewer") {
            setState(true)
          }
          return true
        }
      });

      if (!userExists) {
        navigate('/')
        return
      }
    }
    ExistStory()
    fetchUsers()

  }, [ruleState, removeState, addUserState])


  const saveData = () => {
    console.log(localStorage.getItem('story'))
  }
  const handleMode = () => {
    setMode();
  };
  const inivateInputHandler = (event) => {
    setInvitedUser(event.target.value)
    setInvitationError('none')
    setInvaledEmail("none")
    setUserExistError("none")

  }
  const invitationHandler = async () => {
    const options = {};
    if (invitedUser === "") {
      setInvitationError('block');
      return;
    }
    if (validator.isEmail(invitedUser)) {
      options.email = invitedUser;
    } else {
      options.userName = invitedUser;
    }

    const res = await findAccount(options);
    if (!res.message) {
      setInvaledEmail("block");
      return;
    }
    const writerDocument = {
      AccountId: res._id,
      StoryId: id,
      rule: "viewer"
    };
    try {
      const writing = await saveDocument('Writer', writerDocument);
      if (writing.status === 400) {
        setUserExistError("block");
        return
      }

      const randomNumber = Math.floor(Math.random() * 100);
      setAddUserState(randomNumber);
      document.getElementById('invitaionId').value = ""
      toast("You Have add a new user successfully", {
        icon: '🤝',
      });
    } catch (error) {
    }
  }


  const ruleChangeHandler = async (rule, userId) => {
    const document = {
      AccountId: userId,
      StoryId: id,
      rule: rule
    }
    const res = await updateDocument("rule", document)
    const randomNumber = Math.floor(Math.random() * 100);
    setRuleState(randomNumber)
    toast("You Have changed a users rule successfully", {
      icon: '😊',
    });
  }



  const removeUserHandler = async (userId) => {
    const document = {
      AccountId: userId,
      StoryId: id,
    }
    const res = await deleteDocument('writer', document)
    const randomNumber = Math.floor(Math.random() * 100);
    setRemoveState(randomNumber)
    toast("You Have removed a user successfully", {
      icon: '🙋‍♂️',
    });
  }
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
                <button className="bi bi-envelope-paper-fill btn btn-outline-dark rounded-5 m-1" data-bs-toggle="modal" data-bs-target="#Invitation-modal" title="invite your friend"></button>
                <div className="modal fade" id="Invitation-modal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content" style={{ display: "inline" }}>
                      Do You Want To Invite Someone to Write With You?
                      <div className="row justify-content-end mx-0" style={{ display: "inline" }}>
                        <button type="button" className="btn-close m-2" data-bs-dismiss="modal" aria-label="Close" >
                        </button>
                      </div>
                      <div className="modal-body container fs-1">
                        <div className="row star-widget row-cols-auto justify-content-center">

                        </div>
                        <div className='row rate-msg fs-5 justify-content-center text-secondary'>
                          <input type="text" id='invitaionId' className="form-control" aria-describedby="emailHelp" placeholder="Please enter the user Email or Username" onChange={event => inivateInputHandler(event)} ></input>
                          <div >
                            <span style={{ color: "red", display: invitationError }}>Please provide the user email or username</span>
                            <span style={{ color: "red", display: invaledEmail }}>The username or email you provided does not exist </span>
                            <span style={{ color: "red", display: userExistError }}>This user has been already added</span>

                          </div>
                        </div>

                        {users?.map((user, idx) => {
                          return (
                            <React.Fragment key={idx}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <p className="h4" style={{ display: "inline" }}>{user.userName}</p>
                                <div className="dropdown">

                                  {signedInUser.rule === "owner" ? <><button type="button" className="btn btn-danger m-3" disabled={user.rule === 'owner'} onClick={() => { removeUserHandler(user.AccountId) }}>Remove</button><button className="btn dropdown-toggle" style={{ backgroundColor: "#E1D8D1" }} type="button" id="dropdownMenuButton" disabled={user.rule === 'owner'} data-bs-toggle="dropdown" aria-expanded="false">
                                    {user.rule}
                                  </button> <ul className="dropdown-menu dropdown-menu-dark" style={{ backgroundColor: "#E1D8D1" }} aria-labelledby="dropdownMenuButton">
                                      <li>
                                        <button className="dropdown-item " style={{ color: '#212529' }} onClick={() => {
                                          ruleChangeHandler("admin", user.AccountId)
                                        }}>
                                          Admin
                                        </button>
                                      </li>
                                      <li>
                                        <button className="dropdown-item" style={{ color: '#212529' }} onClick={() => { ruleChangeHandler("viewer", user.AccountId) }}>
                                          Viewer
                                        </button>
                                      </li>
                                    </ul> </> : <></>
                                  }

                                </div>
                              </div>


                            </React.Fragment>
                          )
                        })}
                      </div>
                      <div className="container gap-2 btn-group mb-2">
                        <button type="button" className="btn btn-primary rounded" onClick={invitationHandler}>Add</button>
                        <button type="button" className="btn btn-secondary rounded" data-bs-dismiss="modal">Cancel</button>
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
    </nav >

  );
};

export default WpNavBar;
