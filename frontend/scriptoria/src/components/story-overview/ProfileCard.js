import React, { useState, useEffect } from "react";
import "./ProfileCard.css";
import { getWriters } from "../../api/writers";
import { follows, unfollow, followers ,followings } from "../../api/follow";
import useAuth from "../../hooks/useAuth";
import { findAccount } from "../../api/accountApi";
import { saveDocument } from "../../api/API's";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const ProfileCard = (props) => {
  
  const { auth } = useAuth();
  const navigate = useNavigate()

  const [userData, setUserData] = useState([]);
  const [followersData, setFollowersData] = useState(0);
  const [followingData, setFollowingData] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [worksCount, setWorksCount] = useState(0);
  const [yourId, setYourId] = useState("")
  const [writerId, setWriterId] = useState('')
  const [authorized, setAuthorized] = useState(false)
  const [flag, setFlag] = useState(false)


  useEffect(() => {

    const fetchUserData = async () => {
      try {
        const response = await getWriters(props.storyId);

        if (response.state) {
          setUserData(response.users);
          setWriterId(response.users[0]._id)
          setWorksCount(response.count);
          fetchfollowers(response.users[0]._id);
          fetchfollowings(response.users[0]._id);
          
        }
        fetchAccountData(response.users[0]._id);
        
      } catch (error) {
        console.log(error)
      }
    };

    fetchUserData();
  }, [flag]);
  

  const fetchfollowers = async (id) => {
    try {
      const response = await followers("/followers", id);
      console.log("Follower Count Response:", response); 
      setFollowersData(response.followerCount);

    } catch (error) {
      console.log(error);
    }
  };


  const fetchfollowings = async (id) => {
    try {
      const response = await followings(id);
      console.log("Follower Count Response:", response); 
      setFollowingData(response.followingsNumber);

    } catch (error) {
      console.log(error);
    }
  };


  const fetchAccountData = async (id) => {
    if (Object.keys(auth).length !== 0) {
      
      try {

        const account = await findAccount({ userName: auth.userName });
        setYourId(account._id);

        if(account.message) {

          setAuthorized(true) 
          const following = await follows("following", id, account._id);
          setIsFollowing(following.status);

        } else {
          setAuthorized(false) 
          return
        }
      } catch (error) {
        console.log(error)
      }
  }
};

  const handleFollowClick = async () => {
    
    if (authorized) {

      if(writerId === yourId) {
        toast.error('you cannot follow yourself!');
      } else {

        if (isFollowing) { 

          setIsFollowing(false);
          await unfollow("unfollow", { account: writerId, follow: yourId });
      } else {

          setIsFollowing(true);
          await saveDocument("follow", { account: writerId, follow: yourId });
      }

      setFlag(!flag)
      }
    } else { 
        toast.error('You must be logged in to follow this user!');
    }
};

  const handleArrowLeftClick = () => {
    props.onHideProfile();
  };

  const handleViewProfile = (userName) => {
    navigate(`/profile/${userName}`);
}

  return (
    <div className="container mt-5">
      <div className="row">
        {userData.map((user, index) => (
          <div className="col-md-6" key={index}>
            <div className="card slide-from-right" style={{ width: "350px", height: "400px" }}>
              <i
                className="bi bi-arrow-bar-left position-absolute top-0 start-0 m-3"
                onClick={handleArrowLeftClick}
              ></i>
              <img
                src={`data:image/png;base64,${user?.profilePicture}`}
                className="card-img-top rounded-circle mx-auto d-block mt-2"
                alt="Profile Image"
                style={{ width: "100px", height: "100px" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title profile-name">{user?.userName}</h5>
                <p className="card-text text-muted profile-username">@{user?.displayName}</p>
                <div className="row textf">
                  <div className="col-4 text-muted mt-2">
                    <p className="titleFW">Following</p>
                    <h6 className="numberFW">{followingData}</h6>
                  </div>
                  <div className="col-4 text-muted mt-2">
                    <p className="titleFW">Followers</p>
                    <h6 className="numberFW">{followersData}</h6>
                  </div>
                  <div className="col-4 text-muted mt-2">
                    <p className="titleFW">Work</p>
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
                <button className="btn btn-social btnfollowandviewprofile" onClick={handleFollowClick}>
                  {isFollowing ? "Unfollow" : "Follow"} <i className="bi bi-person-add"></i>
                </button>
                <button className="btn btn-social btnfollowandviewprofile" onClick={() => handleViewProfile(auth.userName)}>View Profile</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;