import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth"
import { Link } from "react-router-dom"
import { getWriters } from "../../../api/writers";
import { deleteStory } from "../../../api/storyAPI";
import { useTranslation } from 'react-i18next';
const MyCard = (props) => {
    const { auth } = useAuth();
    const [writers, setWriters] = useState([]);
    const { t } = useTranslation();
    const handleDeleteStory = async () => {
        try {
            const res = await deleteStory(props.storyId)
            console.log(res)
        } catch (error) {

        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getWriters(props.storyId)
                if (response.state) setWriters(response.users)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    const isWriter = writers.find((writer) => writer.AccountId === auth?.userInfo?._id)
    return (
        <div className="custom-card-article">
            <img src={props.photo} alt="couldn't load" className="custom-card-img object-fit-cover" />
            <div className="custom-card-data">
                <h2 className="custom-card-title">{props.storytitle}</h2>
                {isWriter ? <Link to={`/StoryDetails/${props.storyId}`} className="custom-card-button">{t("MyWorks.Edit")}</Link> : <Link to={`/story/${props.storyId}`} className="custom-card-button">Read</Link>}
                {isWriter ? <Link to={`/story/${props.storyId}`} className="custom-card-button"><div>{t("MyWorks.Preview")}</div></Link> : <></>}
                {isWriter?.rule === 'owner' ? <a className="custom-card-button" onClick={handleDeleteStory}>{t("MyWorks.Delete")}</a> : <></>}
            </div>
        </div>
    )
}
export default MyCard