import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProfileCard from './ProfileCard';
import getstory from '../../api/storyAPI';
import './StoryPage.css';

const StoryCard = () => {
    const [backgroundColor, setBackgroundColor] = useState('white');
    const [showColorOptions, setShowColorOptions] = useState(false);
    const [showProfileCard, setShowProfileCard] = useState(false);
    const [showArrowLeft, setShowArrowLeft] = useState(false);
    const [stories, setStories] = useState(null); 
    const [buttonColor, setButtonColor] = useState(null); 

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
                const response = await getstory(id);
                setStories(response);
                setButtonColor(response.backgroundColor);
            } catch (error) {
                console.error('Error fetching profile:', error);
                setStories({});
            }
        };
        fetchProfile();
    }, []);
    
    return (
        <div className="d-flex justify-content-end align-items-center" style={{ width: "100%", height: "100vh", position: "relative" }}>
            <div className="d-flex justify-content-center align-items-start" style={{ width: "900px", height: "600px" }}>
                {showProfileCard && (
                    <div className="position-absolute" style={{ marginTop: "-50px", left: 200 }}>
                    <ProfileCard onHideProfile={onHideProfile}  />
                    </div>
                )}
                <div className="card" style={{ backgroundColor, flex: "1", width: "1000px", height: "600px" }}>
                    <div className="card-body text-center">
                        {!showProfileCard && showArrowLeft && (
                            <i className="bi bi-arrow-bar-right  btn-right position-absolute top-0 start-0 m-3" onClick={toggleProfileCard}></i>
                        )}
                        <div className="group-color " role="group" aria-label="Background Color">
                            <button type="button" className="group-color2" onClick={toggleColorOptions} ><i className="bi bi-plus text-dark"></i></button>
                        </div>
                        {showColorOptions &&
                            <div className='btncolor '>
                                <button type="button" className=" btnwhite " onClick={() => toggleBackgroundColor('white')} ></button>
                                <button type="button" className=" btnbeige " onClick={() => toggleBackgroundColor('beige')} ></button>
                                <button type="button" className=" btnblack " onClick={() => toggleBackgroundColor('black')} ></button>
                            </div>
                        }
                        {stories && 
                        <div>
                            <h5 className="card-title story-name" style={{ color: backgroundColor === 'black' ? 'white' : 'black' }}>{stories.title}</h5>
                            <p className="card-text story-description" style={{ color: backgroundColor === 'black' ? 'white' : 'black'}}>{stories.description}</p>
                        </div>
                        }
                        <button className="btn btn-primary btn-Start-Reading" style={{ backgroundColor: buttonColor }}>Start Reading...</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoryCard;
