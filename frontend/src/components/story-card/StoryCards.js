import React, { useEffect, useState } from 'react';
import './StoryCard.css'
import { useTranslation } from 'react-i18next';
import { getGenrestory } from '../../api/storyAPI';
import HomePagePlaceholder from '../placeholder/HomePagePlaceholder';
import StoryCard from './StoryCard';

const StoryCards = ({ selectedTab }) => {
    const { t } = useTranslation()
    const [visiblestory, setVisiblestory] = useState(6);
    const loadMoreCards = () => {
        setVisiblestory((prevCount) => prevCount + 6);
    };
    const [storyData, setStoryData] = useState([]);
    const [placeholderShow, setPlaceholderShow] = useState(true);
    const [currentStory, setCurrentStory] = useState([]);
    const [numberOfFiltering, setNumberOfFiltering] = useState(0)


    useEffect(() => {
        setPlaceholderShow(true)
        const fetchStoriesByGenre = async () => {
            try {
                const data = await getGenrestory(selectedTab);
                setStoryData(data || []);
                setCurrentStory(data)
                setPlaceholderShow(false)
                setNumberOfFiltering(numberOfFiltering + 1)
            } catch (error) {
                console.error('Error fetching stories:', error);
            }
        };
        fetchStoriesByGenre();
    }, []);

    useEffect(() => {
        if (!numberOfFiltering) {
            return;
        }
        setPlaceholderShow(true)
        if (selectedTab.toLowerCase() === "all") {
            setCurrentStory(storyData)
            setPlaceholderShow(false)
            setNumberOfFiltering(numberOfFiltering + 1)
            return;
        }
        const filteringStory = storyData?.filter((story) => story.genres.includes(selectedTab));
        setPlaceholderShow(false)
        setNumberOfFiltering(numberOfFiltering + 1)
        setCurrentStory(filteringStory);
    }, [selectedTab])


    return (
        <div>
            {!placeholderShow && currentStory?.length ?
                <div className="d-flex flex-wrap">
                    {currentStory?.map((story, index) => (
                        <div key={index} className={`col-md-4 mb-3 ${index >= visiblestory ? 'd-none' : ''} my-5`}>
                            <StoryCard t={t} story={story} />
                        </div>
                    ))}
                </div> :
                <>
                    {
                        !placeholderShow ?
                            <p className='text-center' style={{ fontSize: "30px", fontWeight: "bold" }}>{t("StoryCard.no_story")}</p> :
                            <HomePagePlaceholder />
                    }
                </>}
            {
                visiblestory < currentStory?.length && (
                    <div className="text-center">
                        <button type="button" className="btn loadMoreCards-btn" onClick={loadMoreCards} style={{ marginBottom: "3%", marginTop: "3%" }}> {t("StoryCard.show_more")} </button>
                    </div>
                )
            }
        </div >
    );

};
export default StoryCards;