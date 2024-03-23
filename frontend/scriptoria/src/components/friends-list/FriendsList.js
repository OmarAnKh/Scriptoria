import React, { useState } from 'react';
import './FriendsList.css';

const friendsinfo = [
    { name: 'Omar Khalili', username: 'Omarkhalili', imageUrl: 'https://assets.website-files.com/6214e7d4ee77846c19ee2dab/64789b44f257164ca2906859_Profile%20Placeholder.png', icon: 'https://d3k81ch9hvuctc.cloudfront.net/company/Wi8qPx/images/f12b4ab0-e38b-4baa-9f5f-1f61586750ad.png' },
    { name: 'Amjad Awad', username: 'AmjadAwad', imageUrl: 'https://assets.website-files.com/6214e7d4ee77846c19ee2dab/64789b44f257164ca2906859_Profile%20Placeholder.png', icon: 'https://png.pngtree.com/png-clipart/20230410/original/pngtree-blogging-line-icon-png-image_9042396.png' },
    { name: 'Abood Jbr', username: 'AboodJbr', imageUrl: 'https://assets.website-files.com/6214e7d4ee77846c19ee2dab/64789b44f257164ca2906859_Profile%20Placeholder.png', icon: 'https://maplibre.org/roadmap/documentation/image.png' },
    { name: 'Mohmmad Ali', username: 'MohmmadAli', imageUrl: 'https://assets.website-files.com/6214e7d4ee77846c19ee2dab/64789b44f257164ca2906859_Profile%20Placeholder.png', icon: 'https://maplibre.org/roadmap/documentation/image.png' },
    { name: 'Ahmad Iyrot alt', username: 'AhmadIyrotalt', imageUrl: 'https://assets.website-files.com/6214e7d4ee77846c19ee2dab/64789b44f257164ca2906859_Profile%20Placeholder.png', icon: 'https://png.pngtree.com/png-clipart/20230410/original/pngtree-blogging-line-icon-png-image_9042396.png' },
    { name: 'Areen Abudayeh', username: 'AreenAbudayeh', imageUrl: 'https://assets.website-files.com/6214e7d4ee77846c19ee2dab/64789b44f257164ca2906859_Profile%20Placeholder.png', icon: 'https://maplibre.org/roadmap/documentation/image.png' },
    { name: 'Lama Shraim', username: 'LamaShrim', imageUrl: 'https://assets.website-files.com/6214e7d4ee77846c19ee2dab/64789b44f257164ca2906859_Profile%20Placeholder.png', icon: 'https://maplibre.org/roadmap/documentation/image.png' },
    { name: 'Noor', username: 'Noor', imageUrl: 'https://assets.website-files.com/6214e7d4ee77846c19ee2dab/64789b44f257164ca2906859_Profile%20Placeholder.png', icon: 'https://maplibre.org/roadmap/documentation/image.png' },
];

const FriendsList = () => {
    const [showAll, setShowAll] = useState(false);
    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    return (
        <div className="container">
            <h2 className="title-friends-list ">Friends List</h2>
            <div className={`card-big ${showAll ? 'scrollspy' : ''}`} style={{ width: '400px', height: '100' }}>
                {friendsinfo.slice(0, showAll ? friendsinfo.length : 5).map((friend, index) => (
                    <div key={index} className="card mb-3" style={{ width: '100%' }}>
                        <div className="card-body d-flex align-items-center ">
                            <button type="button" className="iconimg">
                                <img src={friend.icon} alt="Friend" className="iconimg" />
                            </button>
                            <img src={friend.imageUrl} alt="Profile" className="rounded-circle  imgprofile img-fluid" />
                            <div>
                                <h5 className="friends-name ">{friend.name}</h5>
                                <h6 className="friends-username mb-2 text-muted  ">@{friend.username}</h6>
                            </div>
                        </div>
                        <div className="button-container">
                            <button className="button-icon "><i className="bi bi-person-plus"></i></button>
                            <button className="button-icon "><i className="bi bi-card-text"></i></button>
                            <button className="button-icon"><i className="bi bi-three-dots-vertical"></i></button>
                        </div>
                    </div>
                ))}
                {!showAll && <button className='show-more-btn' onClick={toggleShowAll}>Show More</button>}
            </div>
        </div>
    );
};
export default FriendsList;
