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
    <div className=" row justify-content-between"  style={{ flexDirection: "row-reverse" }} >
      {userData.map((user, idx) => (
        <div key={idx} className=" writer col-md-6 mb-3" >
        <WriterCard handleArrowLeftClick={handleArrowLeftClick} user={user} backgroundColor={props.backgroundColor} />
        </div>
      ))}
    </div>

      );
};

export default ProfileCard;