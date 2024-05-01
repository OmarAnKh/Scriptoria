import React, { useState, useEffect } from "react";
import "./ProfileCard.css";
import { findWriters } from "../../api/writers";
import WriterCard from "./WriterCard";

const ProfileCard = (props) => {

  const [userData, setUserData] = useState([]);
  const [worksCount, setWorksCount] = useState(0);

  useEffect(() => {

    const fetchUserData = async () => {
      try {
        const response = await findWriters(props.storyId);

        if (response.state) {
          setUserData(response.users);
          setWorksCount(response.count);
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