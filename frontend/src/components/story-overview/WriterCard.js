import React, { useEffect, useState } from 'react'
import useFollow from '../../hooks/useFollow';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAccount from '../../hooks/useAccount';
import { useTranslation } from 'react-i18next';
import { Buffer } from 'buffer';

const WriterCard = ({ handleArrowLeftClick, user , backgroundColor}) => {

    const { t } = useTranslation();

    const { setFollow, unFollow, getFollowerCount, isFollowing, getfollowingCount } = useFollow();
    const { auth } = useAuth();
    const { getAccountWork } = useAccount();

    const [followersData, setFollowersData] = useState(0);
    const [followingData, setFollowingData] = useState(0);
    const [isFollowingAccount, setIsFollowingAccount] = useState(false);
    const [worksCount, setWorksCount] = useState(0);
    const [flag, setFlag] = useState(false);


    const navigate = useNavigate()

    useEffect(() => {
        const getIsFollowing = async () => {
            const isFollowingRes = await isFollowing(auth?.userInfo?._id, user?.AccountId)
            setIsFollowingAccount(isFollowingRes.status)
            const followerCount = await getFollowerCount(user?.AccountId);
            setFollowersData(followerCount.followerCount);
            const followingCount = await getfollowingCount(user?.AccountId);
            setFollowingData(followingCount.followingsNumber);
            const accountWorks = await getAccountWork(user?.AccountId, false);
            setWorksCount(accountWorks?.stories?.length);
        }
        getIsFollowing();
    }, [flag])

    const handleFollowClick = async () => {
        if (auth.userName) {
            if (auth?.userInfo?._id === user?.AccountId) {
                toast.error('you cannot follow yourself!');
            } else {
                if (isFollowingAccount) {
                    setIsFollowingAccount(false);
                    await unFollow({ account: auth?.userInfo._id, follow: user?.AccountId })
                } else {
                    setIsFollowingAccount(true);
                    await setFollow({ account: auth?.userInfo._id, follow: user?.AccountId });
                }
                setFlag(!flag)
            }
        } else {
            toast.error('You must be logged in to follow this user!');
        }
    };

    const handleViewProfile = (userName) => {
        navigate(`/profile/${userName}`);
    }

    return (
        <div className="row">
            <div className="col-md-6">
                <div className="card slide-from-right" style={{ width: "350px", height: "400px" }}>
                    <i
                        className="bi bi-arrow-bar-right position-absolute top-0 start-0 m-3"
                        onClick={handleArrowLeftClick}
                    ></i>
                    <img
                        src={`data:image/png;base64,${Buffer.from(user?.profilePicture).toString('base64')}`}
                        className="card-img-top rounded-circle mx-auto d-block mt-2"
                        alt="Profile Image"
                        style={{ width: "100px", height: "100px" }}
                    />
                    <div className="card-body text-center">
                        <h5 className="card-title profile-name">{user?.userName}</h5>
                        <p className="card-text text-muted profile-username">@{user?.displayName}</p>
                        <div className="row textf">
                            <div className="col-4 text-muted mt-2">
                                <p className="titleFW">{t("StoryOverview.following")}</p>
                                <h6 className="numberFW">{followingData}</h6>
                            </div>
                            <div className="col-4 text-muted mt-2">
                                <p className="titleFW">{t("StoryOverview.followers")}</p>
                                <h6 className="numberFW">{followersData}</h6>
                            </div>
                            <div className="col-4 text-muted mt-2">
                                <p className="titleFW">{t("StoryOverview.works")}</p>
                                <h6 className="numberFW">{worksCount}</h6>
                            </div>
                        </div>
                        <p className="mt-2 descriptionperson">{user?.description}</p>
                        <div className="mt-4 socilmedia">
                            <a href={user?.facebook} target="_blank" className="icon me-4">
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a href={user?.instagram} target="_blank" className="icon me-4">
                                <i className="bi bi-instagram"></i>
                            </a>
                            <a href={user?.linkedin} target="_blank" className="icon me-4">
                                <i className="bi bi-linkedin"></i>
                            </a>
                            <a href={user?.twitter} target="_blank" className="icon">
                                <i className="bi bi-twitter"></i>
                            </a>
                        </div>
                    </div>
                    <div className="mt-4 buttonfolowandview ">
                        {auth?.userName && <>
                            <button className="btn btn-social btnfollowandviewprofile" onClick={handleFollowClick} style={{ backgroundColor: backgroundColor }}>
                                {isFollowingAccount ? `${t("StoryOverview.unfollow")}` : `${t("StoryOverview.follow")}`} <i className="bi bi-person-add"></i>
                            </button>
                        </>}
                        <button className="btn btn-social btnfollowandviewprofile" onClick={() => handleViewProfile(user.userName)} style={{  backgroundColor: backgroundColor }}>{t("StoryOverview.view_profile")}</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default WriterCard