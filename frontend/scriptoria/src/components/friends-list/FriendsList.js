import React, { useEffect, useState } from 'react';
import './FriendsList.css';
import FriendsListBtn from './FriendsListBtn';
import { useTranslation } from 'react-i18next';
import { getFriends } from '../../api/accountApi';
import useAuth from '../../hooks/useAuth';

const FriendsList = (props) => {
    const { auth } = useAuth()
    const { t } = useTranslation();
    const [showAll, setShowAll] = useState(false);
    const [friendsinfo, setFriendsInfo] = useState([])
    const [icon, setIcon] = useState('')
    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    useEffect(() => {

        const fetchUsers = async () => {
            const res = await getFriends(props.userId)
            if (res.message) {
                setFriendsInfo(res.friends)
            }
        }

        fetchUsers();
    }, [])
    return (
        <div className="container">
            <h2 className="title-friends-list ">{t("FriendsList.friends_List")}</h2>
            <div className={`card-big friend-card-body ${showAll ? 'scrollspy' : ''}`} >
                {friendsinfo.slice(0, showAll ? friendsinfo.length : 5).map((friend, index) => (
                    <div key={index} className="card friend-list-card mb-3" style={{ width: '100%' }}>
                        <div className="card-body d-flex align-items-center ">
                            <img
                                src={friend.type === 'both'
                                    ? 'https://png.pngtree.com/png-clipart/20230410/original/pngtree-blogging-line-icon-png-image_9042396.png'
                                    : (friend.type === 'writer'
                                        ? 'https://d3k81ch9hvuctc.cloudfront.net/company/Wi8qPx/images/f12b4ab0-e38b-4baa-9f5f-1f61586750ad.png'
                                        : 'https://maplibre.org/roadmap/documentation/image.png'
                                    )}
                                alt="Friend"
                                className="iconimg"
                                style={{ width: "50px", height: '50px' }}
                            />

                            <img src={`data:image/png;base64,${friend.profilePicture}`} alt="Profile" className="rounded-circle  imgprofile img-fluid" />
                            <div>
                                <h5 className=" card-title friends-name mb-3">{friend.displayName}</h5>
                                <p className="card-text friends-username  text-muted  ">@{friend.userName}</p>
                            </div>
                        </div>
                        <FriendsListBtn userName={friend.userName} />
                    </div>
                ))}
                {!showAll && <button className="btn show-more-friend " onClick={toggleShowAll}>{t("FriendsList.show_More")}</button>}
            </div>
        </div>
    );
};
export default FriendsList;
