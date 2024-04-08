import React, { useState, useEffect } from 'react';
import { findAccount } from "../../api/accountApi";
import { getStory } from "../../api/getstory";
import { useParams } from 'react-router-dom';
import './ProfileCard.css';

const ProfileCard = ({ onHideProfile }) => {
    const [userData, setUserData] = useState(null);


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const findCriteria = {
                    userName: userName 
                };
                const response = await findAccount(findCriteria);
                setUserData(response.user);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserData();
    }, []);
    const { userName } = useParams();
    
    const handleArrowLeftClick = () => {
        onHideProfile(); 
    };


    
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <div className="card" style={{ width: "350px", height: "400px" }}>
                        <i className="bi bi-arrow-bar-left position-absolute top-0 start-0 m-3" onClick={handleArrowLeftClick}></i>
                        {userData && (
                            <>
                                <img
                                    src={userData.image}
                                    className="card-img-top rounded-circle mx-auto d-block mt-2"
                                    alt="Profile Image"
                                    style={{ width: "100px", height: "100px" }}
                                />
                                <div className="card-body text-center">
                                    <h5 className="card-title profile-name"> {userData.userName}</h5>
                                    <p className="card-text text-muted profile-username">@{userData.displayName}</p>
                                    <div className="row textf">
                                        <div className="col-4 text-muted mt-2">
                                            <p className='titleFW'>Following</p>
                                            <h6 className='numberFW'>{userData.following}</h6>
                                        </div>
                                        <div className="col-4 text-muted mt-2">
                                            <p className='titleFW'>Followers</p>
                                            <h6 className='numberFW'>{userData.followers}</h6>
                                        </div>
                                        <div className="col-4 text-muted mt-2">
                                            <p className='titleFW'>Work</p>
                                            <h6 className='numberFW'>{userData.work}</h6>
                                        </div>
                                    </div>
                                    <p className='mt-2 descriptionperson'>{userData.description}</p>
                                    <div className="mt-4 socilmedia">
                                        <a href={userData.facebook} target="_blank" className="icon me-4"><i className="bi bi-facebook"></i></a>
                                        <a href={userData.instagram}target="_blank" className="icon me-4"><i className="bi bi-instagram"></i></a>
                                        <a href={userData.linkedin} target="_blank"className="icon me-4"><i className="bi bi-linkedin"></i></a>
                                        <a href={userData.twitter}  target="_blank" className="icon"><i className="bi bi-twitter"></i></a>
                                    </div>
                                </div>
                            </>
                        )}
                        <div className="mt-4 buttonfolowandview ">
                            <button className="btn btn-social btnfollowandviewprofile">Follow <i className="bi bi-person-add"></i></button>
                            <button className="btn btn-social btnfollowandviewprofile ">View Profile</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
