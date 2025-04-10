import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./MyWorks.css";
import MyCard from "./my-works-card/MyCard";
import { story, writerStory } from '../../api/storyAPI.js';
import { Buffer } from 'buffer';
import { findAccount } from '../../api/accountApi.js'
import TopCard from './my-works-card/TopCard.js';
import useAtuh from '../../hooks/useAuth.js'
import { getstory } from '../../api/storyAPI.js'
import NavBar from '../navbar/Navbar.js'
import MyWorkPlaceholder from '../placeholder/MyWorkPlaceholder.js';
import { useTranslation } from 'react-i18next';

const getStories = async (writers, owner) => {
    let temp = []
    for (let i = 0; i < writers.length; i++) {
        if (owner) {
            const res = await getstory(writers[i].StoryId)
            temp.push(res)
        } else {
            const res = await getstory(writers[i].StoryId)
            if (res.story.publishStatus === true) {
                temp.push(res)
            }
        }
    }
    return temp
}

const MyWorks = () => {
    const [stories, setStories] = useState([]);
    const [writers, setWriters] = useState([])
    const { id } = useParams();
    const [currentUser, setCurrentUser] = useState(null);
    const { auth } = useAtuh()
    const [publishStatus, setPublishStatus] = useState(false)
    const owner = auth?.userInfo?._id === id
    const { t } = useTranslation();

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const storiesObject = await writerStory("MyWorks", id, publishStatus);
                setWriters(storiesObject);
                const temp = await getStories(storiesObject, owner);
                setStories(temp);

            } catch (error) {
                console.error("Error fetching stories:", error);
            }
        };
        fetchStories();
    }, [id, publishStatus, owner]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await findAccount({ _id: id })
                setCurrentUser(user.user);

            } catch (error) {
                console.error("Error fetching User:", error);
            }
        };
        fetchUser();
    }, [id]);

    const sortedStories = [...stories].sort((a, b) => b.likes - a.likes);
    const top5 = sortedStories.slice(0, 5);

    return (
        <><NavBar />
            <div className='custom-card-contain mt-5'>
                <div className="container">
                    <h2 className='moveitmoveit'>{t("MyWorks.StoryBy")} {currentUser?.userName}</h2>
                    <h4 className='moveitmoveit'>{stories?.length} {t("MyWorks.Stories")}</h4>
                    <div className="custom-card-contain custom-card-container1">
                        {stories?.length !== 0 ? stories?.map((story, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <MyCard
                                        photo={story?.story?.coverPhoto?.data ? `data:image/png;base64,${Buffer.from(story?.story?.coverPhoto?.data).toString('base64')}` : undefined}
                                        storytitle={story?.story?.title}
                                        key={index}
                                        storyId={story?.story?._id}
                                        userId={id}
                                        setStories={setStories}
                                    />
                                </React.Fragment>
                            )
                        }) :
                            <MyWorkPlaceholder type="mycard" />}
                    </div>
                </div>
                <div className='top5col mt-5 col-lg-4'>
                    <h4>{t("MyWorks.TopStories")}</h4>
                    {top5.length !== 0 ? top5.map((top5, index) => {
                        return (
                            <React.Fragment key={index}>
                                <TopCard
                                    index={index + 1}
                                    photo={top5?.story?.coverPhoto?.data ? `data:image/png;base64,${Buffer.from(top5?.story?.coverPhoto?.data).toString('base64')}` : undefined}
                                    storytitle={top5?.story?.title}
                                    key={index}
                                />
                            </React.Fragment>)
                    }) : <MyWorkPlaceholder type="topcard" />}
                </div>
            </div>
        </>
    );
};

export default MyWorks;