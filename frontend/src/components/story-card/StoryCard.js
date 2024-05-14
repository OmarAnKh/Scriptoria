import React, { useEffect, useState } from 'react';
import './StoryCard.css'
import StarRating from '../star-rating/StarRating';
import { useTranslation } from 'react-i18next';
import { Buffer } from 'buffer';
import { getGenrestory } from '../../api/storyAPI';
import { Link } from 'react-router-dom';
import Placeholder from '../placeholder/Placeholder';

const StoryCard = ({ selectedTab }) => {
    const { t } = useTranslation()
    const [visiblestory, setVisiblestory] = useState(6);
    const loadMoreCards = () => {
        setVisiblestory((prevCount) => prevCount + 6);
    };
    const [storyData, setStoryData] = useState([]);


    useEffect(() => {
        const fetchStoriesByGenre = async () => {
            try {
                const data = await getGenrestory(selectedTab);
                setStoryData(data || []);
            } catch (error) {
                console.error('Error fetching stories:', error);
            }
        };
        fetchStoriesByGenre();
    }, [selectedTab]);

    return (
        <div>
            {storyData?.length ?
                <div className="d-flex flex-wrap">
                    {storyData?.map((story, index) => (
                        <div key={index} className={`col-md-4 mb-3 ${index >= visiblestory ? 'd-none' : ''} my-5`}>
                            <div className={`card mb-1`} style={{ width: '95%', height: '100%', margin: '0 10px', minHeight: '200px', backgroundColor: story?.story?.backgroundColor }}>
                                <div className="row no-gutters">
                                    <div className="col-md-4">
                                        <Link to={`/story/${story?.story._id}`}>
                                            <img
                                                src={story?.story.coverPhoto?.data ? `data:image/jpeg;base64,${Buffer.from(story?.story?.coverPhoto.data).toString('base64')}` : ''}
                                                alt="story-img"
                                                className="card-img object-fit-cover"
                                                style={{ width: '100%', height: '100%', minHeight: '200px' }} />
                                        </Link>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title story-title text-white">{story?.story?.title}</h5>
                                            <h6 className="author text-white">
                                                {story?.writers?.map((author, idx) => (
                                                    <span key={idx}>
                                                        {author?.AccountId.displayName}
                                                        {idx !== story.writers.length - 1 && ' , '}
                                                    </span>
                                                ))}
                                            </h6>
                                            <div className="d-flex">
                                                <StarRating rating={story?.counts?.avg} />
                                                <div className='voters text-white'>{story?.counts?.rates} {t("CarouselCards.votes")}</div>
                                            </div>
                                            <p className="card-text description-story text-white">{story?.story?.description}</p>
                                            <Link to={`/story/${story?.story?._id}`}><button type="button" className="btn btn-light rounded-4 px-5 fw-bold read-btn">{t("CarouselCards.read_the_book")}</button></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div> :
                <>
                    {
                        storyData?.status === 404 ?
                            <p></p> :
                            <Placeholder />
                    }
                </>}
            {
                visiblestory < storyData.length && (
                    <div className="text-center">
                        <button type="button" className="btn loadMoreCards-btn" onClick={loadMoreCards} style={{ marginBottom: "3%", marginTop: "3%" }}> {t("StoryCard.show_more")} </button>
                    </div>
                )
            }
        </div >
    );

};
export default StoryCard;
