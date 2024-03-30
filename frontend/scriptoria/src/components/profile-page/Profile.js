import React from 'react';
import '../profile-info/ProfileInfo.css'
import { getAccountViaUserName } from "../../api/accountApi";
import Cookies from 'js-cookie'
import { useState, useEffect } from 'react';
import { useParams, useNavigate} from "react-router-dom";
import ProfileInfo from "../profile-info/ProfileInfo"
import BookShelf from "../book-shelf/BookShelf"
import FriendsList from "../friends-list/FriendsList";
import Navbar from "../navbar/Navbar";

const ProfileBooks = (props) => {
    return (
        <>
            <div className="row">
                <div className="col text-center">
                    <BookShelf username={props.username} />
                </div>
                <div className="col-md-4">
                    <FriendsList username={props.username} />
                </div>
            </div>
        </>
    );
}

const Profile = () => {
    const [data, setData] = useState("");
    const { username } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const handleResponse = async () => {
            let user = username
            try {
                const res = await getAccountViaUserName("find/userName", user);
                if (!res.userName) {
                    setData({ status: false });
                    return;
                }
                setData(res);
            } catch (err) {
                console.log(err);
            }
            
        };
        
        handleResponse();
    }, []);

    

    if (username === Cookies.get("userInfo") && data.userName) {
        return (
            <>
                <div className="container-fluid profile-page-body">
                    <Navbar />
                    <ProfileInfo user={data} userStatus={false} />
                    <ProfileBooks username={username} />
                </div>
            </>
        );
    } else if (username !== Cookies.get("userInfo") && data.userName) {
        return (
            <div className="container-fluid profile-page-body">
                <Navbar />
                <ProfileInfo visit={Cookies.get("userInfo")} user={data} userStatus={true} />
                <ProfileBooks username={username} />
            </div>
        );
    } else {
        navigate('*')
        return null;
    }
};

export default Profile;
