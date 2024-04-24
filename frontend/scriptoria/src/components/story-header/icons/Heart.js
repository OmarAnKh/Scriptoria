import { useState, useEffect } from "react";
import { saveDocument, updateDocument } from "../../../api/API's";

const Heart = ({ num, id, accountId, setData }) => {

    const [heartIcon, setHeartIcon] = useState(() => {
        const storedColor = localStorage.getItem('heartColor');
        return storedColor ? storedColor : 'text-white';
    });

    useEffect(() => {
        localStorage.setItem('heartColor', heartIcon);
    }, [heartIcon]);

    const ChangeIconColor = () => {
        setHeartIcon((originalColor) => (originalColor == "text-white" ? "text-danger" : "text-white"));
    }

    const handleClick = async () => {

        if (heartIcon == "text-danger") {
            const updated = await updateDocument('stories', { id: id, likes: num - 1 })
            setData(updated)

        } else {
            const updated = await updateDocument('stories', { id: id, likes: num + 1 })
            setData(updated)

            const currentDate = new Date();
            await saveDocument('likes', {
                AccountId: accountId,
                StoryId: id,
                publishDate: currentDate.toISOString()
            })
        }

        ChangeIconColor()
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