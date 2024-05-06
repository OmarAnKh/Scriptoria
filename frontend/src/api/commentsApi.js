import axios from 'axios'

const sendComment = async (comment, token) => {
    try {
        await axios({
            url: `${process.env.REACT_APP_HOSTURL}/comments`,
            method: "POST",
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + token,
            },
            data: comment
        });
    } catch (error) {
        console.log(error);
    }
}

const getComments = async (storyId) => {
    try {
        const response = await axios({
            url: `${process.env.REACT_APP_HOSTURL}/comments/${storyId}`,
            method: "GET",
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
            params: {
                storyId
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

const getCommentsCount = async (storyId) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/comments/count/${storyId}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            }
        })

        if (response.ok) {
            return response.json()
        }
        return response
    } catch (error) {
        console.log(error)
    }
}

const editComment = async (comment, token) => {
    try {
        const res = await axios({
            url: `${process.env.REACT_APP_HOSTURL}/comments/${comment._id}`,
            method: "PATCH",
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + token,
            },
            data: comment
        })
        return res
    } catch (error) {
        console.log(error)
    }
}

const deleteComment = async (id, token) => {
    try {
        const response = await axios({
            url: `${process.env.REACT_APP_HOSTURL}/comments/${id}`,
            method: "DELETE",
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + token,
            },
        });
        return response.data;
    } catch (error) {
        console.error("error :", error);
    }
};

export {
    getComments,
    sendComment,
    deleteComment,
    editComment,
    getCommentsCount
}