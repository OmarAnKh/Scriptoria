import React, { useState, useEffect } from "react";
import "./ProfileCard.css";
import { getWriters } from "../../api/writers";
import { follows, unfollow, followers } from "../../api/follow";
import useAuth from "../../hooks/useAuth";
import { findAccount } from "../../api/accountApi";
import { saveDocument } from "../../api/API's";

const ProfileCard = (props) => {
  const { auth } = useAuth();
  const [userData, setUserData] = useState([]);
  const [followersData, setFollowersData] = useState(0);
  const [followingData, setFollowingData] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [worksCount, setWorksCount] = useState(0);
  const [yourId, setYourId] = useState("")

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getWriters(props.storyId);
        setUserData(response.users);

        fetchfollowers(response.users[0].AccountId);
        fetchfollowing(response.users[0].AccountId);
        fetchUserAccount();
        ifIsFollowing();
        setWorksCount(response.count);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchfollowers = async (userId) => {
      try {
        const response = await followers("/followers", userId);
        setFollowersData(response.followerCount);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchfollowing = async (userId) => {
      try {
        const response = await followers("/following", userId);
        setFollowingData(response.followerCount);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUserAccount = async () => {
      try {
        const account = await findAccount({ userName: auth.userName });
        setYourId(account._id);
      } catch (error) {
        console.log(error)
      }
    }

    const ifIsFollowing = async () => {
      try {
        const response = await follows("following", userData[0].AccountId);
        setIsFollowing(response.status)
      } catch (error) {
        console.log(error)
      }
    }

    fetchUserData();
  }, []);

  const handleFollowClick = async () => {
    const userId = userData[0].AccountId;
    try {
      if (isFollowing) {

        await unfollow("unfollow", { account: yourId, follow: userId });
        setIsFollowing(false);
        setFollowersData(prevCount => prevCount - 1);
      } else {

        // await follows("follow", { account: yourId, follow: userId });
        await saveDocument("follow", { account: yourId, follow: userId })
        setIsFollowing(true);
        setFollowersData(prevCount => prevCount + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleArrowLeftClick = () => {
    props.onHideProfile();
  };


  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
        <div className="card slide-from-right" style={{ width: "350px", height: "400px" }}>
            <i
              className="bi bi-arrow-bar-left position-absolute top-0 start-0 m-3"
              onClick={handleArrowLeftClick}
            ></i>
            {userData?.map((user, index) => {
              return (
                <React.Fragment key={index}>
                  <img
                    src={`data:image/png;base64,${user?.profilePicture}`}
                    className="card-img-top rounded-circle mx-auto d-block mt-2"
                    alt="Profile Image"
                    style={{ width: "100px", height: "100px" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title profile-name">
                      {user?.userName}
                    </h5>
                    <p className="card-text text-muted profile-username">
                      @{user?.displayName}
                    </p>
                    <div className="row textf">
                      <div className="col-4 text-muted mt-2">
                        <p className="titleFW">Following</p>
                        <h6 className="numberFW">
                          {followingData && followingData}
                        </h6>
                      </div>
                      <div className="col-4 text-muted mt-2">
                        <p className="titleFW">Followers</p>
                        <h6 className="numberFW">
                          {followersData && followersData}
                        </h6>
                      </div>
                      <div className="col-4 text-muted mt-2">
                        <p className="titleFW">Work</p>
                        <h6 className="numberFW">{worksCount}</h6>
                      </div>
                    </div>
                    <p className="mt-2 descriptionperson">
                      {user?.description}
                    </p>
                    <div className="mt-4 socilmedia">
                      <a
                        href={user?.facebook}
                        target="_blank"
                        className="icon me-4"
                      >
                        <i className="bi bi-facebook"></i>
                      </a>
                      <a
                        href={user?.instagram}
                        target="_blank"
                        className="icon me-4"
                      >
                        <i className="bi bi-instagram"></i>
                      </a>
                      <a
                        href={user?.linkedin}
                        target="_blank"
                        className="icon me-4"
                      >
                        <i className="bi bi-linkedin"></i>
                      </a>
                      <a href={user?.twitter} target="_blank" className="icon">
                        <i className="bi bi-twitter"></i>
                      </a>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
            <div className="mt-4 buttonfolowandview ">
              <button className="btn btn-social btnfollowandviewprofile" onClick={handleFollowClick}>
                {isFollowing ? "Unfollow" : "Follow"} <i className="bi bi-person-add"></i>
              </button>
              <button className="btn btn-social btnfollowandviewprofile ">
                View Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
