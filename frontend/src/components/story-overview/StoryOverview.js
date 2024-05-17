import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProfileCard from './ProfileCard';
import './StoryPage.css';
import { getStory } from '../../api/storyAPI';
import useSlide from '../../hooks/useSlide';
import { useTranslation } from 'react-i18next';

const StoryCard = () => {
    const { t } = useTranslation();

    const { id } = useParams();
    const navigate = useNavigate()

    const [backgroundColor, setBackgroundColor] = useState('white');
    const [showColorOptions, setShowColorOptions] = useState(false);
    const [showProfileCard, setShowProfileCard] = useState(false);
    const [showArrowLeft, setShowArrowLeft] = useState(false);
    const [stories, setStories] = useState(null);
    const [slide, setSlide] = useState("")

    const getSlides = useSlide();

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

    const handleStartReading = () => {
        navigate(`/ReadingPage/${id}`)
    }

    useEffect(() => {
        setShowArrowLeft(!showProfileCard);
    }, [showProfileCard]);


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getStory(id, "stories");
                setStories(response.story);
                setSlide(getSlides(response.story.slide.ops, 1000)[0])
            } catch (error) {
                console.error('Error fetching profile:', error);
                setStories({});
            }
        };
        fetchProfile();
    }, []);

    return (

        <div className="container-details justify-content-end my-3">
            <div className="row-details justify-content-between">
                <div className="prof-card position-relative  ">
                    {showProfileCard && (
                        <div className="profileCard">
                        <ProfileCard onHideProfile={onHideProfile} storyId={stories._id} backgroundColor={stories && stories.backgroundColor} />
                        </div>
                    )}
                </div>
                <div className="card story-prev " style={{ backgroundColor }}>
                    <div className="card-body text-center">
                        {!showProfileCard && showArrowLeft && (
                            <i className="bi bi-arrow-bar-left btn-right position-absolute top-0 start-0 m-3" onClick={toggleProfileCard}></i>
                        )}
                        <div className="group-color " role="group" aria-label="Background Color">
                            <button type="button" className={`group-color2 ${backgroundColor === '#242425' ? 'border-white' : 'border-dark'}`} onClick={toggleColorOptions}><i className={`bi bi-plus ${backgroundColor === '#242425' ? 'text-white' : 'text-dark'}`}></i></button>
                        </div>
                        {showColorOptions &&
                            <div className='btncolor '>
                                <button type="button" className=" btnwhite " onClick={() => toggleBackgroundColor('white')}></button>
                                <button type="button" className=" btnbeige " onClick={() => toggleBackgroundColor('beige')}></button>
                                <button type="button" className=" btnblack " onClick={() => toggleBackgroundColor('#242425')}></button>
                            </div>
                        }
                        {stories &&
                            <div>
                                <h5 className={`card-title story-name ${backgroundColor === 'white' ? 'white-bg' : (backgroundColor === 'beige' ? 'beige-bg' : 'black-bg')}`}>{stories.title}</h5>
                                <p className={`card-text story-description ${backgroundColor === 'white' ? 'white-bg' : (backgroundColor === 'beige' ? 'beige-bg' : 'black-bg')}`} dangerouslySetInnerHTML={{ __html: slide + "..." }}></p>
                            </div>
                        }
                        <button className="btn btn-primary btn-Start-Reading" onClick={handleStartReading} style={{ backgroundColor: stories && stories.backgroundColor }}>{t("StoryOverview.start_reading")}</button>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default StoryCard;

