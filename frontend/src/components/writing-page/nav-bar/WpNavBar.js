import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import validator from "validator";
import { findAccount, getListOfAccountsInformationByAnArrayOfIds } from "../../../api/accountApi";
import { deleteDocument, saveDocument, updateDocument } from "../../../api/API's";
import { getStoryWritersUsingStoryId } from "../../../api/writers";
import { getStoryByItsID } from "../../../api/storyAPI";
import useAuth from "../../../hooks/useAuth";
import useSendEmail from "../../../hooks/useSendEmail";
import useThemeToggle from "../../../hooks/useThemeToggle.js";
import { deleteInvitationByReceiverIdAndStoryId, getInvitationsByStoryId } from "../../../api/invitations.js";
import { Tooltip } from "react-tooltip";
import toast from "react-hot-toast";
import "./WpNavBar.css";

const COOLDOWN_DURATION = 5; // Cooldown duration in seconds

const WpNavBar = ({ socket, setMode, setState }) => {
  const navigate = useNavigate();
  const { sendMail } = useSendEmail();
  const { auth } = useAuth();
  const { id } = useParams();
  const [invitedUser, setInvitedUser] = useState("");
  const [invitationError, setInvitationError] = useState("none");
  const [userExistError, setUserExistError] = useState("none");
  const [invaledEmail, setInvaledEmail] = useState("none");
  const [users, setUsers] = useState([]);
  const [removeState, setRemoveState] = useState(false);
  const [addUserState, setAddUserState] = useState(false);
  const [ruleState, setRuleState] = useState(false);
  const [signedInUser, setSignedInUser] = useState({});
  const [publishStatus, setPublishStatus] = useState(false);
  const [copied, setCopied] = useState(false);
  const [storyData, setStoryData] = useState({});
  const [addCooldown, setAddCooldown] = useState(0);
  const [removeCooldowns, setRemoveCooldowns] = useState({});
  useThemeToggle();

  useEffect(() => {
    const cooldownTimer = setInterval(() => {
      setAddCooldown(prev => Math.max(0, prev - 1));
      setRemoveCooldowns(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(key => {
          updated[key] = Math.max(0, updated[key] - 1);
        });
        return updated;
      });
    }, 1000);

    return () => clearInterval(cooldownTimer);
  }, []);

  const startCooldown = (type, userId = null) => {
    if (type === 'add') {
      setAddCooldown(COOLDOWN_DURATION);
    } else if (type === 'remove' && userId) {
      setRemoveCooldowns(prev => ({
        ...prev,
        [userId]: COOLDOWN_DURATION
      }));
    }
  };

  useEffect(() => {
    const ExistStory = async () => {
      const getStoryResponse = await getStoryByItsID(id);

      if (!getStoryResponse) {
        navigate('/NoAccessPage');
        return;
      }

      const getInvitationsResponse = await getInvitationsByStoryId(id);
      const getInvitedUserInformationResponse = await getListOfAccountsInformationByAnArrayOfIds({ getInvitationsResponse, storyId: id });
      const getWritersResponse = await getStoryWritersUsingStoryId(id);

      setPublishStatus(getStoryResponse?.publishStatus);
      setStoryData(getStoryResponse);

      const currentWriter = getWritersResponse.writers.find(writer => writer.AccountId === auth?.userInfo._id);
      if (!currentWriter) {
        navigate('/NoAccessPage');
        return;
      }
      setSignedInUser(currentWriter);
      if (currentWriter.rule === "viewer") {
        setState(true);
      }

      const allRelevantUsers = [...(getInvitedUserInformationResponse.users || [])].filter(user => user !== null);
      const ownerWriter = getWritersResponse.writers.find(writer => writer.rule === "owner");

      if (ownerWriter) {
        const ownerAlreadyInList = allRelevantUsers.some(user => user._id === ownerWriter.AccountId);

        if (!ownerAlreadyInList) {
          const ownerUserInfo = await findAccount({ _id: ownerWriter.AccountId });
          allRelevantUsers.push({
            _id: ownerWriter.AccountId,
            displayName: ownerUserInfo.user.displayName,
            userName: ownerUserInfo.user.userName,
            status: "accepted"
          });
        }
      }

      const usersWithRules = allRelevantUsers.map(user => {
        const writer = getWritersResponse.writers.find(writer => writer.AccountId === user._id);
        return {
          ...user,
          rule: writer ? writer.rule : null
        };
      });

      const sortedUsers = usersWithRules.sort((a, b) => {
        if (a.rule === "owner") return -1;
        if (b.rule === "owner") return 1;
        return 0;
      });

      setUsers(sortedUsers);
    };

    ExistStory();
  }, [ruleState, removeState, addUserState]);

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
        console.error('Error copying to clipboard:', error);
      });
  };

  const handleMode = () => {
    setMode();
  };

  const inivateInputHandler = (event) => {
    setInvitedUser(event.target.value);
    setInvitationError('none');
    setInvaledEmail("none");
    setUserExistError("none");
  };

  const invitationHandler = async () => {
    if (addCooldown > 0) {
      toast.error(`Please wait ${addCooldown} seconds before adding another user`);
      return;
    }

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
    const invitationDocument = {
      sender: auth?.userInfo._id,
      story: id,
      receiver: res._id
    };

    try {
      const invitation = await saveDocument('invite', invitationDocument);
      if (invitation.status === 400) {
        setUserExistError("block");
        return;
      }
      sendMail(res.user.email, { invitationId: invitation._id }, "invitation");
      setAddUserState(Math.random());
      document.getElementById('invitaionId').value = "";
      startCooldown('add');
      toast("You have added a new user successfully", {
        icon: '🤝',
      });
    } catch (error) {
      console.error('Error sending invitation:', error);
    }
  };

  const ruleChangeHandler = async (rule, userId) => {
    const targetUser = users.find(user => user._id === userId);
    if (targetUser?.rule === 'owner') {
      toast.error("Cannot change the owner's role");
      return;
    }

    socket.emit("rule-change", { userId, rule });
    const document = {
      AccountId: userId,
      StoryId: id,
      rule: rule
    };
    await updateDocument("rule", document)
    setRuleState(Math.random());
    toast("You have changed the user's role successfully", {
      icon: '😊',
    });
  };

  const removeAcceptedUserHandler = async (userId) => {
    console.log(10)
    if (removeCooldowns[userId] > 0) {
      toast.error(`Please wait ${removeCooldowns[userId]} seconds before removing this user`);
      return;
    }
    console.log(20)

    const targetUser = users.find(user => user._id === userId);
    if (targetUser?.rule === 'owner') {
      toast.error("Cannot remove the owner");
      return;
    }

    socket.emit("remove-user", userId);

    try {
      const document = {
        AccountId: userId,
        StoryId: id,
      };
      console.log(document)
      console.log(await deleteDocument('writer', document))
      await deleteInvitationByReceiverIdAndStoryId(userId, id);
      setRemoveState(Math.random());
      startCooldown('remove', userId);
      toast("You have removed the user successfully", {
        icon: '🙋‍♂️',
      });
    } catch (error) {
      console.error('Error removing user:', error);
    }
  };

  const removePendingUserHandler = async (userId) => {
    console.log(10)
    if (removeCooldowns[userId] > 0) {
      toast.error(`Please wait ${removeCooldowns[userId]} seconds before removing this user`);
      return;
    }

    const targetUser = users.find(user => user._id === userId);
    if (targetUser?.rule === 'owner') {
      toast.error("Cannot remove the owner");
      return;
    }

    socket.emit("remove-user", userId);

    try {
      const document = {
        AccountId: userId,
        StoryId: id,
      };
      await deleteDocument('writer', document)
      await deleteDocument('writer', document)
      await deleteInvitationByReceiverIdAndStoryId(userId, id);
      setRemoveState(Math.random());
      startCooldown('remove', userId);
      toast("You have removed the user successfully", {
        icon: '🙋‍♂️',
      });
    } catch (error) {
      console.error('Error removing user:', error);
    }
  };

  useEffect(() => {
    if (socket == null) return;

    socket.on("changed", (rule) => {
      setState(rule === "viewer");
      toast(`Your role has been changed to: ${rule}`, {
        icon: '😊',
      });
    });

    socket.on("navigate", () => {
      toast("The owner has removed you from the story page", {
        icon: '🙋‍♂️',
      });
      navigate('/NoAccessPage');
    });
  }, [socket]);

  const handelPublish = async () => {
    const isOwner = users?.some(writer =>
      writer._id === auth?.userInfo._id && writer.rule === "owner"
    );

    if (!isOwner) {
      toast.error('Only the owner can publish this story');
      return;
    }

    const document = {
      id: id,
      publishStatus: !publishStatus
    };
    await updateDocument("stories", document);
    setPublishStatus(!publishStatus);
  };

  const isOwner = signedInUser.rule === "owner";

  return (
    <>
      <div className="nav-container fixed-top w-100 mx-0 row justify-content-center">
        <nav className="navbar navbar-expand-md WpNavBar rounded-5 py- my-2 w-75" id="WpNavBar">
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
              <ul className="nav flex-nowrap align-items-center list-unstyled">
                <Link to={'/'} className="btn nav-btn rounded-5" data-tooltip-id="my-tooltip" data-tooltip-content="finish writing and go to home page" data-tooltip-place='bottom'>finish</Link>
              </ul>
            </div>
            <div className="collapse navbar-collapse text-center order-2" id="navbarNavDropdown">
              <ol className="navbar-nav mx-auto flex-column flex-md-row">
                <li className="nav-item">
                  <button className="btn nav-btn rounded-5 mx-2 my-1" data-bs-toggle="modal" data-bs-target="#Invitation-modal" data-tooltip-id="my-tooltip" data-tooltip-content="invite your friend to write with you" data-tooltip-place='bottom'>invite</button>
                </li>
                <li className="nav-item">
                  <button className="btn nav-btn rounded-5 mx-2 my-1" onClick={handleMode}>focus mode</button>
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    className="btn rounded-5 nav-btn mx-2 my-1"
                    onClick={handelPublish}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={isOwner ? "change publish status" : "only owner can change publish status"}
                    data-tooltip-place='bottom'
                    disabled={!isOwner}
                  >
                    {publishStatus ? "published" : "private"}
                  </button>
                </li>
              </ol>
            </div>
          </div>
        </nav>
      </div>

      <div className="modal fade" id="Invitation-modal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ display: "inline" }}>
            <div style={{ marginLeft: "2%" }}>
              Do You Want To Invite Someone to Write With You?
              <div className="justify-content-end mx-0" style={{ display: "inline" }}>
                <button type="button" className="btn-close m-2" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
            </div>
            <div className="modal-body container fs-1">
              <div className="fs-5 justify-content-center text-secondary p-2">
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
                      <svg className="clipboard" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 6.35 6.35">
                        <g>
                          <path d="M2.43.265c-.3 0-.548.236-.573.53h-.328a.74.74 0 0 0-.735.734v3.822a.74.74 0 0 0 .735.734H4.82a.74.74 0 0 0 .735-.734V1.529a.74.74 0 0 0-.735-.735h-.328a.58.58 0 0 0-.573-.53zm0 .529h1.49c.032 0 .049.017.049.049v.431c0 .032-.017.049-.049.049H2.43c-.032 0-.05-.017-.05-.049V.843c0-.032.018-.05.05-.05zm-.901.53h.328c.026.292.274.528.573.528h1.49a.58.58 0 0 0 .573-.529h.328a.2.2 0 0 1 .206.206v3.822a.2.2 0 0 1-.206.205H1.53a.2.2 0 0 1-.206-.205V1.529a.2.2 0 0 1 .206-.206z" fill="currentColor"></path>
                        </g>
                      </svg>
                      <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                        <g>
                          <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" fill="currentColor"></path>
                        </g>
                      </svg>
                    </span>
                  </button>
                </div>

                <div>
                  <span style={{ color: "red", display: invitationError }}>Please provide the user email or username</span>
                  <span style={{ color: "red", display: invaledEmail }}>The username or email you provided does not exist</span>
                  <span style={{ color: "red", display: userExistError }}>This user has been already added</span>
                </div>
              </div>

              {users?.map((user, idx) => (
                <React.Fragment key={idx}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div className="d-flex align-items-center">
                      <p className="h4 mb-0">{user.userName}</p>
                    </div>
                    <div className="dropdown" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      {user.rule === "owner" ? (
                        <button type="button" className="btn m-1" style={{ backgroundColor: "#E1D8D1" }} disabled>
                          Owner
                        </button>
                      ) : user.status === "pending" ? (
                        <>
                          {isOwner && (
                            <button
                              type="button"
                              className="btn btn-danger m-1"
                              onClick={() => removePendingUserHandler(user._id)}
                              disabled={removeCooldowns[user._id] > 0}
                            >
                              {removeCooldowns[user._id] > 0 ? `Remove (${removeCooldowns[user._id]}s)` : 'Remove'}
                            </button>
                          )}
                          <button type="button" className="btn m-1" style={{ backgroundColor: "#E1D8D1", opacity: "0.7" }} disabled>
                            Pending
                          </button>
                        </>
                      ) : user.status === "rejected" ? (
                        <>
                          {isOwner && (
                            <button
                              type="button"
                              className="btn btn-danger m-1"
                              onClick={() => removeAcceptedUserHandler(user._id)}
                              disabled={removeCooldowns[user._id] > 0}
                            >
                              {removeCooldowns[user._id] > 0 ? `Remove (${removeCooldowns[user._id]}s)` : 'Remove'}
                            </button>
                          )}
                          <button type="button" className="btn m-1" style={{ backgroundColor: "#E1D8D1" }} disabled>
                            Rejected
                          </button>
                        </>
                      ) : (
                        <>
                          {isOwner && (
                            <button
                              type="button"
                              className="btn btn-danger m-1"
                              onClick={() => removeAcceptedUserHandler(user._id)}
                              disabled={removeCooldowns[user._id] > 0}
                            >
                              {removeCooldowns[user._id] > 0 ? `Remove (${removeCooldowns[user._id]}s)` : 'Remove'}
                            </button>
                          )}
                          {isOwner && user.rule !== "owner" ? (
                            <>
                              <button
                                className="btn dropdown-toggle m-1"
                                style={{ backgroundColor: "#E1D8D1" }}
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                {user.rule || "Set Role"}
                              </button>
                              <ul className="dropdown-menu dropdown-menu-dark" style={{ backgroundColor: "#E1D8D1" }} aria-labelledby="dropdownMenuButton">
                                <li>
                                  <button className="dropdown-item" style={{ color: '#212529' }} onClick={() => {
                                    ruleChangeHandler("admin", user._id)
                                  }}>
                                    Admin
                                  </button>
                                </li>
                                <li>
                                  <button className="dropdown-item" style={{ color: '#212529' }} onClick={() => { ruleChangeHandler("viewer", user._id) }}>
                                    Viewer
                                  </button>
                                </li>
                              </ul>
                            </>
                          ) : (
                            <button type="button" className="btn m-1" style={{ backgroundColor: "#E1D8D1" }} disabled>
                              {user.rule || "No Role"}
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div className="container gap-2 btn-group mb-2">
              <button
                className="btn nav-btn rounded-5 mx-2 my-1"
                onClick={invitationHandler}
                disabled={addCooldown > 0}
              >
                Invite {addCooldown > 0 ? `(${addCooldown}s)` : ""}
              </button>
              <button type="button" className="btn btn-secondary rounded-5 mx-2 my-1" data-bs-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WpNavBar;