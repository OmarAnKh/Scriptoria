import React, { useEffect, useState } from 'react';
import './ProfileInfo.css'
import InfoButton from './Card.js'
import ActionButton from './ButtonCard.js'
import { follows, unfollow } from "../../api/follow.js"
import { useNavigate, useParams } from "react-router-dom"
import logo from "../../img/content.png";
import { saveDocument, updateDocument } from '../../api/API\'s.js';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth.js';
import useFollow from '../../hooks/useFollow.js';
import useAccount from '../../hooks/useAccount.js';

const ProfileInfo = (props) => {

    const { auth } = useAuth();

    const { getAccountByUserName, getAccountWork } = useAccount();

    const { t } = useTranslation()
    const data = props.user;
    const [following, setFollowing] = useState(false)
    const [user, setUser] = useState({})
    const [follow_id, setFollow_id] = useState({})
    const [imgURL, setImgURL] = useState(logo)
    const navigate = useNavigate()
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0)
    const [editAbout, setEditAbout] = useState(false);
    const [editedDescription, setEditedDescription] = useState(data.description);
    const [getAccountWorks, setGetAccountWorks] = useState(0)

    const { username: userName } = useParams()

    const { setFollow, unFollow, getFollowerCount, getfollowingCount, isFollowing } = useFollow();

    const editAboutHandler = async () => {
        setEditAbout(true);

    }
    const saveAboutHandler = async () => {
        const document = {
            _id: auth?.userInfo?._id,
            description: editedDescription
        }
        const res = await updateDocument('account', document)
        setEditAbout(false);
        window.location.reload();

    }
    const followHandler = async () => {
        const following = {
            account: auth?.userInfo?._id,
            follow: follow_id._id
        }
        setFollow(following)
        setFollowing(true)
    }

    const signInHandler = () => {
        navigate('/registration')

    }

    const blockHandler = async () => {
        const block = {
            account: follow_id._id,
            block: auth?.userInfo?._id
        }
        const res = await saveDocument("block", block)
        window.location.reload();
    }
    const unblockHandler = async () => {
        const unblock = {
            account: follow_id._id,
            block: auth?.userInfo?._id
        }
        const res = await unfollow("unblock", unblock)

        window.location.reload();
    }

    const unfollowHandler = async () => {
        const unfollowObj = {
            account: auth?.userInfo?._id,
            follow: follow_id._id
        }
        unFollow(unfollowObj)
        setFollowing(false)
    }


    const settingsHandler = async () => {
        navigate(`/settings/${auth?.userInfo?._id}`)
    }
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const _id = (await getAccountByUserName(userName))._id
                const followerCount = await getFollowerCount(_id)
                setFollowerCount(followerCount);
                const folloingCount = await getfollowingCount(_id)
                setFollowingCount(folloingCount)
                const accountWorks = await getAccountWork(_id, true)
                if (accountWorks.state) {
                    setGetAccountWorks(accountWorks?.stories?.length)
                }
            } catch (error) {
                console.error("Error fetching followers:", error);
            }

            const account = props.visit;
            const followId = props.user;
            setUser(account);
            setFollow_id(followId);

            if (account) {
                const res = await isFollowing(auth?.userInfo?._id, followId?._id)
                setFollowing(res.status)
            }
            if (data.profilePicture) {
                setImgURL(`data:image/png;base64,${data.profilePicture}`)
            } else {
                setImgURL(logo)
            }
        }

        fetchData();

    }, []);
    if (!props.ifblocked) {
        return (
            <div className="MainPage row">

                <div className="Nda col">
                    <div className="DisplayName">
                        {t("ProfileInfo.hello")}
                        <br></br>{data.displayName}
                        <div className="Username"> @{data.userName}</div>
                    </div>
                    <br />
                    <div className='container'>
                        <div className="AboutMe">
                            {t("ProfileInfo.about")}
                            <div className="DescriptionArea ">
                                {editAbout ? (
                                    <textarea
                                        className="form-control"
                                        value={editedDescription}
                                        onChange={(e) => setEditedDescription(e.target.value)}
                                    />
                                ) : (
                                    <p>{data.description}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="buttons">
                        {props.userStatus ? (
                            <>
                                {!auth?.userName ? (<>
                                    <ActionButton
                                        label={t("ProfileInfo.follow")}
                                        className="thebtn buttonstyle icon"
                                        svgClassName="bi bi-person-add ms-3"
                                        path1="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4"
                                        path2="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 16 16"
                                        method={signInHandler}
                                    />
                                    <ActionButton
                                        label={t("ProfileInfo.message")}
                                        className="thebtn buttonstyle"
                                        svgClassName="bi bi-chat-right-text"
                                        path1="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"
                                        path2="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 16 16"
                                        method={signInHandler}
                                    />
                                </>
                                ) : (
                                    !following ? (<>
                                        <ActionButton
                                            label={t("ProfileInfo.follow")}
                                            className="thebtn buttonstyle icon"
                                            svgClassName="bi bi-person-add ms-3"
                                            path1="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4"
                                            path2="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 16 16"
                                            method={followHandler}
                                        />
                                        <ActionButton
                                            label={t("ProfileInfo.message")}
                                            className="thebtn buttonstyle"
                                            svgClassName="bi bi-chat-right-text mt-2 ms-4"
                                            path1="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"
                                            path2="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 16 16"
                                        />
                                        <ActionButton
                                            className="thebtn threedots icon"
                                            svgClassName="bi bi-three-dots-vertical"
                                            path1="M13.879 10.414a2.501 2.501 0 0 0-3.465 3.465zm.707.707-3.465 3.465a2.501 2.501 0 0 0 3.465-3.465m-4.56-1.096a3.5 3.5 0 1 1 4.949 4.95 3.5 3.5 0 0 1-4.95-4.95ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 16 16"
                                            method={blockHandler}
                                        />
                                    </>
                                    ) : (<>
                                        <ActionButton
                                            label={t("ProfileInfo.unfollow")}
                                            className="thebtn buttonstyle icon"
                                            svgClassName="bi bi-person-add ms-3"
                                            path1="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0"
                                            path2="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 16 16"
                                            method={unfollowHandler}
                                        />
                                        <ActionButton
                                            label={t("ProfileInfo.message")}
                                            className="thebtn buttonstyle"
                                            svgClassName="bi bi-chat-right-text mt-2 ms-4"
                                            path1="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"
                                            path2="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 16 16"
                                        />
                                        <ActionButton
                                            className="thebtn threedots icon"
                                            svgClassName="bi bi-three-dots-vertical"
                                            path1="M13.879 10.414a2.501 2.501 0 0 0-3.465 3.465zm.707.707-3.465 3.465a2.501 2.501 0 0 0 3.465-3.465m-4.56-1.096a3.5 3.5 0 1 1 4.949 4.95 3.5 3.5 0 0 1-4.95-4.95ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 16 16"
                                            method={blockHandler}
                                        />
                                    </>
                                    )
                                )}

                            </>
                        ) : (
                            <>
                                <ActionButton
                                    label={!editAbout ? t("ProfileInfo.edit") : t("ProfileInfo.save")}
                                    className="thebtn buttonstyle icon"
                                    svgClassName="bi bi-person-add ms-3"
                                    path1={!editAbout ? "M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" : "M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"}
                                    path2={!editAbout ? "M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" : "M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"}
                                    width="20"
                                    height="20"
                                    viewBox="0 0 16 16"
                                    method={!editAbout ? editAboutHandler : saveAboutHandler}
                                />

                                {!editAbout ?
                                    <ActionButton
                                        label={t("ProfileInfo.settings")}
                                        className="thebtn buttonstyle"
                                        svgClassName="bi bi-chat-right-text mt-2 ms-4"
                                        path1="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"
                                        path2="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 16 16"
                                        method={settingsHandler}
                                    /> : <></>}
                            </>
                        )}
                    </div>

                </div>
                <div className='col d-flex p-3 profileframe'>
                    <div>
                        <div className="col-12 mb-3">
                            <div className="ImageFrame">
                                <img className="profileImage img-thumbnail" src={imgURL} />
                            </div>
                        </div>
                        <div className="">
                            <div className="buttons1">
                                <InfoButton text={t("ProfileInfo.followers")} value={followerCount?.followerCount} />
                                <InfoButton text={t("ProfileInfo.works")} value={getAccountWorks} />
                                <InfoButton text={t("ProfileInfo.following")} value={followingCount?.followingsNumber} />
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <hr className='Divider' />
                <br />
            </div >
        );
    } else {
        return (

            < div className="MainPage row" >

                <div className="Nda col">
                    <div className="DisplayName">
                        {t("ProfileInfo.hello")}<br></br>{data.userName}
                        <div className="Username"> @{data.displayName}</div>
                    </div>
                    <br />
                    <br />
                    <div className="buttons">
                        <ActionButton
                            label={t("ProfileInfo.Unblock")}
                            className="thebtn buttonstyle icon"
                            svgClassName="bi bi-person-add ms-3"
                            path1="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"
                            width="20"
                            height="20"
                            viewBox="0 0 16 16"
                            method={unblockHandler}
                        />
                    </div>
                </div>
                <div className='col d-flex p-3 profileframe'>
                    <div>
                        <div className="col-12 mb-3">
                            <div className="ImageFrame">
                                <img className="profileImage img-thumbnail" src={imgURL} />
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <hr className='Divider' />
                <br />
            </div >
        );
    }
};

export default ProfileInfo;