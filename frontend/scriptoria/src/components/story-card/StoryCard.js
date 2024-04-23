import React, { useEffect, useState } from 'react';
import './StoryCard.css'
import StarRating from '../star-rating/StarRating';
import { useTranslation } from 'react-i18next';
import { Buffer } from 'buffer';

const StoryCard = ({ selectedTab }) => {
    const { t } = useTranslation()
    const [visiblestory, setVisiblestory] = useState(3);
    const loadMoreCards = () => {
        setVisiblestory((prevCount) => prevCount + 3);
    };
    const [storyData, setStoryData] = useState([]);


    useEffect(() => {
        console.log(selectedTab);
        const fetchStoriesByGenre = async () => {
            try {
                const response = await fetch(`/storiesGenre/${selectedTab}`);
                
                if (response.ok) {
                    const data = await response.json();
                    console.log(data,100);
                    setStoryData(data || []);
                } else {
                    throw new Error('Failed to fetch stories');
                }
            } catch (error) {
                console.error('Error fetching stories:', error);
            }
        };

        fetchStoriesByGenre();
    }, [selectedTab]);

    return (
        <div className=" d-flex flex-wrap">
            {storyData.map((story, index) => (
                <div key={story.id} className={`col-md-4 mb-3  ${index >= visiblestory ? 'd-none' : ''} my-5`}>
                    <div className={`card  mb-1`} style={{ width: '95%', height: '100%', margin: '0 10px', minHeight: '200px', backgroundColor: story.story.backgroundColor }}>
                        <div className="row no-gutters">
                            <div className="col-md-4">
                                <img
                                    src={story.story.coverPhoto?.data ? `data:image/jpeg;base64,${Buffer.from(story.story.coverPhoto.data).toString('base64')}` : ''}
                                    alt="story-img"
                                    className="card-img"
                                    style={{ width: '100%', height: '100%', minHeight: '200px' }} />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title story-title text-white">{story.story.title}</h5>
                                    <h6 className="author text-white">{console.log(story)}</h6>
                                    <div className="d-flex">
                                        <StarRating rating={story.counts.avg} />
                                        <div className='voters text-white'>{story.counts.rates} votes</div>
                                    </div>
                                    <p className="card-text description-story text-white">{story.story.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {visiblestory < storyData.length && (
                <button type="button" className="btn loadMoreCards-btn" onClick={loadMoreCards} style={{ marginBottom: "3%", marginTop: "3%" }}> {t("StoryCard.show_more")} </button>
            )}
        </div>
    );

};
export default StoryCard;