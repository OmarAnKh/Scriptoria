import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProfileCard from './ProfileCard';
import './StoryPage.css';
import { getStory } from '../../api/storyAPI';
const StoryCard = () => {
    const [backgroundColor, setBackgroundColor] = useState('white');
    const [showColorOptions, setShowColorOptions] = useState(false);
    const [showProfileCard, setShowProfileCard] = useState(false);
    const [showArrowLeft, setShowArrowLeft] = useState(false);
    const [stories, setStories] = useState(null);

    const toggleBackgroundColor = (color) => {
        setBackgroundColor(color);
        setShowColorOptions(false);
    };

    const toggleColorOptions = () => {
        setShowColorOptions(!showColorOptions);
    };

    const toggleProfileCard = () => {
        setShowProfileCard(!showProfileCard);
        setShowArrowLeft(true);
    };

    const onHideProfile = () => {
        setShowProfileCard(false);
        setShowArrowLeft(false);
    };

    useEffect(() => {
        setShowArrowLeft(!showProfileCard);
    }, [showProfileCard]);


    const { id } = useParams();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getStory(id, "stories");
                setStories(response.story);
            } catch (error) {
                console.error('Error fetching profile:', error);
                setStories({});
            }
        };
        fetchProfile();
    }, []);

    return (

<div className="container-details justify-content-end " style={{ width: "100%", height: "100vh" }}>
    <div className="row-details justify-content-between" style={{ width: "1000px", height: "600px" }}>
        <div className="prof-card position-relative  "style={{ marginLeft: "-100px" }} >
            {showProfileCard && (
                        <div className="" style={{ marginLeft: "-200px" , transform: "translateY(-10%)" }}>
                        <ProfileCard onHideProfile={onHideProfile} storyId={stories._id} />
                </div>
            )}
        </div>
        <div className="card story-prev " style={{ backgroundColor, flex: "1", minWidth: "600px", height: "600px" }}>
            <div className="card-body text-center">
                {!showProfileCard && showArrowLeft && (
                    <i className="bi bi-arrow-bar-right btn-right position-absolute top-0 start-0 m-3" onClick={toggleProfileCard}></i>
                )}
                <div className="group-color " role="group" aria-label="Background Color">
                    <button type="button" className="group-color2" onClick={toggleColorOptions}><i className="bi bi-plus text-dark"></i></button>
                </div>
                {showColorOptions &&
                    <div className='btncolor '>
                        <button type="button" className=" btnwhite " onClick={() => toggleBackgroundColor('white')}></button>
                        <button type="button" className=" btnbeige " onClick={() => toggleBackgroundColor('beige')}></button>
                        <button type="button" className=" btnblack " onClick={() => toggleBackgroundColor('black')}></button>
                    </div>
                }
                {stories &&
                    <div>
                        <h5 className="card-title story-name" style={{ color: backgroundColor === 'black' ? 'white' : 'black' }}>{stories.title}</h5>
                        <p className="card-text story-description" style={{ color: backgroundColor === 'black' ? 'white' : 'black' }}>{stories.description}</p>
                    </div>
                }
                <button className="btn btn-primary btn-Start-Reading" style={{ backgroundColor: stories && stories.backgroundColor }}>Start Reading...</button>
            </div>
        </div>
    </div>
</div>
);

};

export default StoryCard;

