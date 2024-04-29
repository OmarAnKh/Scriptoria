import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./MyWorks.css";
import MyCard from "./my-works-card/MyCard";
import { writerStory } from '../../api/storyAPI.js';
import { Buffer } from 'buffer';
import { findAccount } from '../../api/accountApi.js'
import TopCard from './my-works-card/TopCard.js';

const MyWorks = () => {
    const [stories, setStories] = useState([]);
    const { userId } = useParams();
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const storiesObject = await writerStory("/MyWorks", userId);
                setStories(storiesObject.Stories);
            } catch (error) {
                console.error("Error fetching stories:", error);
            }
        };

        fetchStories();
    }, [userId]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await findAccount(userId)
                setCurrentUser(user.user);

            } catch (error) {
                console.error("Error fetching User:", error);
            }
        };

        fetchUser();
    }, []);
    stories.sort((a, b) => b.likes - a.likes);
    const top5 = stories.slice(0, 5);
    return (
        <div className='custom-card-container mt-5'>
            <div className="container">
                <h2 className='moveitmoveit'>Stories By {currentUser?.userName}</h2>
                <h4 className='moveitmoveit'>{stories.length} Stories</h4>
                <div className="custom-card-container custom-card-container1">
                    {stories.map((story, index) => {
                        return (
                            <React.Fragment key={index}>
                                <MyCard
                                    photo={`data:image/png;base64,${Buffer.from(story.coverPhoto.data).toString('base64')}`}
                                    storytitle={story.title}
                                    key={index}
                                />
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
            <div className='top5col mt-5 col-lg-4'>
                <h4>Top Stories</h4>
                {top5.map((top5, index) => {
                    return (
                        <React.Fragment key={index}>
                            <TopCard
                                index={index + 1}
                                photo={`data:image/png;base64,${Buffer.from(top5.coverPhoto.data).toString('base64')}`}
                                storytitle={top5.title}
                                key={index}
                            />
                        </React.Fragment>)
                })}
            </div>
        </div>

    );
};

export default MyWorks;
