import React, { useState, useEffect } from 'react';
import '../profile-info/ProfileInfo.css'
import { findAccount } from "../../api/accountApi";
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
                    <BookShelf username={props.username} userId={props.userId} />
                </div>
                <div className="col-md-4">
                    <FriendsList username={props.username} userId={props.userId} />
                </div>
            </div>
        </>
    );
}

const Profile = () => {
    const { auth } = useAuth();
    const [user, setUser] = useState("")
    const [block, setBlock] = useState(false)
    const { username } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await findAccount({ userName: username });
                if (!res.message) {
                    navigate('/*');
                    return;
                }
                setUser(res.user);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [username, navigate]);

    useEffect(() => {
        const handleBlocked = async () => {
            try {
                if (user) {
                    const res = await follows("blocking", user._id, auth._id);
                    setBlock(res.status)
                    return
                }
            } catch (err) {
                console.log(err);
            }
        };

        if (auth.userName) {
            handleBlocked();
        }
    }, [auth, user]);

    if (username === auth.userName && user) {
        return (
            <>
                <Navbar />
                <div className="container-fluid profile-page-body">
                    <ProfileInfo user={user} userStatus={false} ifblocked={false} />
                    <ProfileBooks username={username} userId={user._id} />
                </div>
            </>
        );
    } else if (username !== auth.userName && user) {
        if (!block || !auth.userName) {
            return (
                <>
                    <Navbar />
                    <div className="container-fluid profile-page-body">
                        <ProfileInfo visit={user} user={user} userStatus={true} ifblocked={false} />
                        <ProfileBooks username={username} userId={user._id} />
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <Navbar />
                    <div className="container-fluid profile-page-body">
                        <ProfileInfo visit={user} user={user} userStatus={true} ifblocked={true} />
                    </div>
                </>
            )
        }
    }
};

export default Profile;
