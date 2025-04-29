const createPost = async (post) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/createPost`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                // 'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(post)
        })
        return response.json();
    } catch (error) {
        console.log(error)
    }
}
const updatePost = async (updatedPost) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/updatePost`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                // 'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(updatedPost)
        });
        return response.json();
    } catch (error) {
        console.log("Failed to update post:", error);
        return { state: false, error: error.message };
    }
}

const deletePost = async (postId) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/deletePost/${postId}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                // 'Authorization': 'Bearer ' + token,
            }
        })
        return response.json();
    } catch (error) {
        console.log("Failed to update post:", error);
        return { state: false, error: error.message };
    }
}
export {
    createPost,
    updatePost,
    deletePost
}