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
    const [placeholderShow, setPlaceholderShow] = useState(false)


    useEffect(() => {
        setPlaceholderShow(false)
        const fetchStoriesByGenre = async () => {
            try {
                const data = await getGenrestory(selectedTab);
                setStoryData(data || []);
                setPlaceholderShow(true)
            } catch (error) {
                console.error('Error fetching stories:', error);
            }
        };
        fetchStoriesByGenre();
    }, [selectedTab]);

    return (
        <div>
            {storyData?.length && placeholderShow ?
                <div className="d-flex flex-wrap">
                    {storyData?.map((story, index) => (
                        <div key={index} className={`col-md-4 mb-3 ${index >= visiblestory ? 'd-none' : ''} my-5`}>
                            <StoryCard t={t} story={story} />
                        </div>
                    ))}
                </div> :
                <>
                    {
                        storyData?.status || !placeholderShow === 404 ?
                            <p></p> :
                            <HomePagePlaceholder />
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
export default StoryCards;