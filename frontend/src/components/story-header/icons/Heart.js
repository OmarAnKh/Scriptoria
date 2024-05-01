import { useState, useEffect } from "react";
import { updateDocument } from "../../../api/API's";
import { getLike, deleteLike, createLike } from "../../../api/likesApi";
import useAuth from "../../../hooks/useAuth";
import { findAccount } from "../../../api/accountApi";
import { toast } from 'react-hot-toast';

const Heart = ({ num, storyId, setData }) => {

    const { auth } = useAuth();

    const [userId, setUserId] = useState()
    const [authorized, setAuthorized] = useState(false)
    const [heartIcon, setHeartIcon] = useState('text-white')

    const ChangeIconColor = () => {
        setHeartIcon((originalColor) => (originalColor == "text-white" ? "text-danger" : "text-white"));
    }

    useEffect(() => {

        const fetchLike = async () => {

            if (Object.keys(auth).length !== 0) {

                const user = auth.userName;

                try {
                    const response = await findAccount({ userName: user });
                    setUserId(response._id);

                    if(response.message) {
                        setAuthorized(true)
                        const liked = await getLike('likes', response._id, storyId)
                        if(liked.message) {
                            setHeartIcon('text-danger')
                        }
                    } else {
                        setAuthorized(false)
                        return
                    }
                    
                } catch (error) {
                    console.log(error);
                }
            }
        };

        fetchLike();
    }, [])

    const handleClick = async () => {

        if(authorized) {

            if (heartIcon == "text-danger") {
                const updated = await updateDocument('stories', { id: storyId, likes: num - 1 })
                setData(updated)

                await deleteLike('likes', { AccountId: userId, StoryId: storyId })

            } else {
                const updated = await updateDocument('stories', { id: storyId, likes: num + 1 })
                setData(updated)

                const currentDate = new Date();
                await createLike('likes', {
                    AccountId: userId,
                    StoryId: storyId,
                    publishDate: currentDate.toISOString()
                })
            }
            ChangeIconColor()
        } else {
            toast.error('You must be logged in to like this story!');
        }

    }


    return (
        <span className="mx-5">
            <span className={`px-2 rounded ${heartIcon} heading ms-auto d-flex flex-column align-items-center`}>
                <i className="bi bi-heart-fill" style={{ color: heartIcon, cursor: 'pointer', justifySelf: 'center', fontSize: '2rem' }} onClick={handleClick}></i>
            </span>
            <h6 className="text-white"> {num}<span className="icon-title"> likes</span></h6>
        </span>
    );
} 

export default Heart;