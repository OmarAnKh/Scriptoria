import React from 'react';
import '../profile-info/ProfileInfo.css'
import { findAccount } from "../../api/accountApi";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import ProfileInfo from "../profile-info/ProfileInfo"
import BookShelf from "../book-shelf/BookShelf"
import FriendsList from "../friends-list/FriendsList";
import Navbar from "../navbar/Navbar";
import { follows } from '../../api/follow';
import useAuth from '../../hooks/useAuth';

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
    const { auth } = useAuth();
    const [data, setData] = useState("");
    const [user, setUser] = useState("")
    const [block, setBlock] = useState(false)
    const { username } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const handleResponse = async () => {
            try {
                const res = await findAccount({ userName: username });
                if (!res.message) {
                    setData({ status: false });
                    return;
                }
                setData(res.user);
            } catch (err) {
                console.log(err);
            }

        };

        handleResponse();
    }, []);

    useEffect(() => {
        if (auth.userName) {
            const handleUser = async () => {
                try {
                    const res = await findAccount({ userName: auth.userName });
                    if (!res.message) {
                        setUser({ status: false });
                        return;
                    }
                    setUser(res.user);
                } catch (err) {
                    console.log(err);
                }
            };
            handleUser();
        }
    }, []);

    const handleBlocked = async () => {
        try {
            const res = await follows("blocking", user._id, data._id);
            setBlock(res.status)
            return
        } catch (err) {
            console.log(err);
        }
    }

    if (username === auth.userName && data.userName) {
        return (
            <>
                <Navbar />
                <div className="container-fluid profile-page-body">
                    <ProfileInfo user={data} userStatus={false} ifblocked={false} />
                    <ProfileBooks username={username} />
                </div>
            </>
        );
    } else if (username !== auth.userName && data.userName) {
        handleBlocked()
        if (!block || !auth.userName) {
            return (
                <>
                    <Navbar />
                    <div className="container-fluid profile-page-body">
                        <ProfileInfo visit={user} user={data} userStatus={true} ifblocked={false} />
                        <ProfileBooks username={username} />
                    </div></>
            );
        } else {
            return (
                <>
                    <Navbar />
                    < div className="container-fluid profile-page-body" >
                        <ProfileInfo visit={user} user={data} userStatus={true} ifblocked={true} />
                    </ div>
                </>
            )
        }
    } else {
        navigate('*')
        return null;
    }
};

export default Profile;
