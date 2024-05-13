import React, { useState, useEffect } from "react";
import "./ProfileCard.css";
import { getWriters } from "../../api/writers";
import WriterCard from "./WriterCard";

const ProfileCard = (props) => {

  const [userData, setUserData] = useState([]);

  useEffect(() => {

    const fetchUserData = async () => {
      try {
        const response = await getWriters(props.storyId);

        if (response.state) {
          setUserData(response.users);
        }

      } catch (error) {
        console.log(error)
      }
    };

    fetchUserData();
  }, []);

  const handleArrowLeftClick = () => {
    props.onHideProfile();
  };

  return (
    <div className="container mt-5">
      {userData.map((user, idx) => {
        return (
          <div key={idx} className="mb-3">
            <WriterCard handleArrowLeftClick={handleArrowLeftClick} user={user} />
          </div>
        )
      })}
    </div >
  );
};

export default ProfileCard;