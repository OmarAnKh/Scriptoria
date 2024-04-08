import axios from 'axios'

const sendComment = async (comment, token) => {
    try {
        await axios({
            url: "http://localhost:5000/comments",
            method: "POST",
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

const getComments = async (storyId) =>{
    try {
        const response = await axios({
            url: "http://localhost:5000/comments/" + storyId,
            method: "GET",
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

const editComment = async (commentId, text, token) =>{
    try {
        await axios({
            url : "http://localhost:5000/comments/" + commentId,
            method : "PATCH",
            headers : {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + token,
            },
            data : {text} 
        })
    } catch(error){
        console.log(error)
    }
}

const deleteComment = async (id, token) => {
    try {
        const response = await axios({
            url: `http://localhost:5000/comments/${id}`,
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("error :", error);
        throw error;
    }
};

export {
    getComments,
    sendComment,
    deleteComment,
    editComment
}