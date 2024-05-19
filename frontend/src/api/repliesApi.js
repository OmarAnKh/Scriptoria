import axios from 'axios'

const sendReply = async (reply, token) => {
    try {
        const res = await axios({
            url: `${process.env.REACT_APP_HOSTURL}/replies`,
            method: "POST",
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + token,
            },
            data: reply
        });
        return res
    } catch (error) {
        console.log(error);
    }
}

const getReplies = async (storyId) => {
    try {
        const res = await axios({
            url: `${process.env.REACT_APP_HOSTURL}/replies/${storyId}`,
            method: "GET",
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            }
        });
        return res;
    } catch (error) {
        console.log(error);
    }
}

const editReply = async (reply, token) => {
    try {
        const res = await axios({
            url: `${process.env.REACT_APP_HOSTURL}/replies/${reply._id}`,
            method: "PATCH",
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + token,
            },
            data: reply
        })
        return res
    } catch (error) {
        console.log(error)
    }
}

const deleteReply = async (id, token) => {
    try {
        const res = await axios({
            url: `${process.env.REACT_APP_HOSTURL}/replies/${id}`,
            method: "DELETE",
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + token,
            },
        });
        return res;
    } catch (error) {
        console.error("error :", error);
    }
};

export {
    sendReply,
    getReplies,
    editReply,
    deleteReply
}