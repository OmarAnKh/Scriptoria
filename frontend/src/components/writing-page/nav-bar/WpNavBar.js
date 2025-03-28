import React, { useEffect, useState } from "react";
import "./WpNavBar.css";
import { Link } from "react-router-dom";


import { findAccount } from "../../../api/accountApi";
import validator from "validator";
import { useParams, useNavigate } from "react-router-dom";
import { deleteDocument, saveDocument, updateDocument } from "../../../api/API's";
import { getWriters } from "../../../api/writers";
import useAuth from "../../../hooks/useAuth";
import { getstory } from "../../../api/storyAPI";
import toast from "react-hot-toast";
import useSendEmail from "../../../hooks/useSendEmail";
import { Tooltip } from "react-tooltip";
import useThemeToggle from "../../../hooks/useThemeToggle.js"


const WpNavBar = ({ socket, setMode, setState }) => {
  const navigate = useNavigate()
  const { sendMail } = useSendEmail();
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
  const [publishStatus, setPublishStatus] = useState(false);
  const [copied, setCopied] = useState(false);
  const [storyData, setStoryData] = useState({});
  useThemeToggle()


  useEffect(() => {
    const ExistStory = async () => {
      const res = await getstory(id)
      setPublishStatus(res?.story.publishStatus);
      if (res?.status) {
        navigate('/NoAccessPage')
        return
      }
      setStoryData(res.story);
    }
    const fetchUsers = async () => {
      const res = await getWriters(id)
      setUsers(res.users)
      const userExists = res.users?.some(writer => {
        if (writer.AccountId === auth?.userInfo._id && writer.invitationStatus === 'accepted') {
          setSignedInUser(writer)
          if (writer.rule === "viewer") {
            setState(true)
          }
          return true
        }
      });

      if (!userExists) {
        navigate('/NoAccessPage')
        return
      }
    }
    ExistStory()
    fetchUsers()

  }, [ruleState, removeState, addUserState])

  const copyToClipboard = () => {
    const url = window.location.href;

    navigator.clipboard.writeText(url)
      .then(() => {
        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch((error) => {
        // If copying fails, handle the error here
        console.error('Error copying to clipboard:', error);
      });
  };
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
      rule: "viewer",
      senderId: auth?.userInfo._id
    };
    try {
      const writing = await saveDocument('Writer', writerDocument);
      if (writing.status === 400) {
        setUserExistError("block");
        return
      }
      sendMail(res.user.email, { invitationId: writing.writer._id }, "invitation")
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
    socket.emit("rule-change", { userId, rule })
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

  useEffect(() => {
    if (socket == null) return

    socket.on("changed", (rule) => {
      setState(rule == "admin" ? false : true)
      toast(`Your role has been changed to: ${rule}`, {
        icon: '😊',
      });
    })

  }, [socket])

  const removeUserHandler = async (userId) => {
    socket.emit("remove-user", userId)

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

  useEffect(() => {
    if (socket == null) return

    socket.on("navigate", () => {
      toast("The owner has removed you from the story page", {
        icon: '🙋‍♂️',
      });
      navigate('/NoAccessPage')
    })

  }, [socket])

  const handelPublish = async () => {
    const userExists = users?.some(writer => {
      if (writer.AccountId === auth?.userInfo._id) {
        setSignedInUser(writer)
        if (writer.rule === "owner") {
          return true
        }
        return false
      }
    });
    if (!userExists) {
      toast.error('you can\'t publish this story because you aren\'t the owner of the story');
      return;
    }
    const document = {
      id: id,
      publishStatus: !publishStatus
    }
    const res = await updateDocument("stories", document);
    setPublishStatus(!publishStatus);
  }

  return (
    <>

      <div className="nav-container fixed-top w-100 mx-0 row justify-content-center">
        <nav className="navbar navbar-expand-md  WpNavBar  rounded-5 py- my-2 w-75" id="WpNavBar">
          <div className="container-fluid d-flex justify-content-between">
            <button
              className="navbar-toggler order-1 collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="toggle-icon top-bar" />
              <span className="toggle-icon middle-bar" />
              <span className="toggle-icon bottom-bar" />
            </button>
            <Tooltip id="my-tooltip" />
            <div className="d-flex">
              <ul className="nav flex-nowrap align-items-center list-unstyled ">
                <Link to={'/'} className="btn nav-btn rounded-5" data-tooltip-id="my-tooltip" data-tooltip-content="finish writing and go to home page" data-tooltip-place='bottom'>finish</Link>
              </ul>
            </div>
            <div className="collapse navbar-collapse text-center order-2" id="navbarNavDropdown">
              <ol className="navbar-nav mx-auto flex-column flex-md-row">
                <li className="nav-item">
                  <button className="btn nav-btn rounded-5 mx-2 my-1" data-bs-toggle="modal" data-bs-target="#Invitation-modal" data-tooltip-id="my-tooltip" data-tooltip-content="invite you friend to write with you" data-tooltip-place='bottom'>invite</button>
                </li>
                <li className="nav-item">
                  <button className="btn nav-btn rounded-5 mx-2 my-1" onClick={handleMode}>focus mode</button>
                </li>
                <li className="nav-item">
                  <button type="button" className="btn rounded-5 nav-btn mx-2 my-1" onClick={handelPublish} data-tooltip-id="my-tooltip" data-tooltip-content="change publish status" data-tooltip-place='bottom'>
                    {publishStatus ? "published" : "private"}
                  </button>
                </li>
              </ol>
            </div>
          </div>
        </nav >
      </div>
      <div className="modal fade" id="Invitation-modal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content " style={{ display: "inline" }}>
            <div style={{ marginLeft: "2%" }}>Do You Want To Invite Someone to Write With You?
              <div className="justify-content-end mx-0" style={{ display: "inline" }}>
                <button type="button" className="btn-close m-2" data-bs-dismiss="modal" aria-label="Close" >
                </button>
              </div>
            </div>
            <div className="modal-body container fs-1">
              <div className="row-cols-auto justify-content-center">
              </div>
              <div className='fs-5 justify-content-center text-secondary p-2'>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="text"
                    id="invitationId"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Please enter the user Email or Username"
                    onChange={(event) => inivateInputHandler(event)}
                    style={{ marginRight: '8px' }}
                  />
                  <button className="copy" onClick={copyToClipboard}>
                    <span className="tooltip" data-text-initial="Copy to clipboard" data-text-end="Copied!">
                      {copied ? 'Copied!' : 'Copy to clipboard'}
                    </span>
                    <span>
                      <svg
                        className="clipboard"
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="20"
                        height="20"
                        viewBox="0 0 6.35 6.35"
                        style={{ enableBackground: 'new 0 0 512 512' }}
                        xmlSpace="preserve"
                      >
                        <g>
                          <path
                            d="M2.43.265c-.3 0-.548.236-.573.53h-.328a.74.74 0 0 0-.735.734v3.822a.74.74 0 0 0 .735.734H4.82a.74.74 0 0 0 .735-.734V1.529a.74.74 0 0 0-.735-.735h-.328a.58.58 0 0 0-.573-.53zm0 .529h1.49c.032 0 .049.017.049.049v.431c0 .032-.017.049-.049.049H2.43c-.032 0-.05-.017-.05-.049V.843c0-.032.018-.05.05-.05zm-.901.53h.328c.026.292.274.528.573.528h1.49a.58.58 0 0 0 .573-.529h.328a.2.2 0 0 1 .206.206v3.822a.2.2 0 0 1-.206.205H1.53a.2.2 0 0 1-.206-.205V1.529a.2.2 0 0 1 .206-.206z"
                            fill="currentColor"
                          ></path>
                        </g>
                      </svg>
                      <svg
                        className="checkmark"
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        style={{ enableBackground: 'new 0 0 512 512' }}
                        xmlSpace="preserve"
                      >
                        <g>
                          <path
                            d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                            fill="currentColor"
                            dataOriginal="#000000"
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </button>
                </div>

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
    </>
  );
};

export default WpNavBar;
