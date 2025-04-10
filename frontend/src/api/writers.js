const getWriters = async (findCriteria) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/find/writers/${findCriteria}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response.json();
    } catch (error) {
        return error;
    }
}
const findWriters = async (findCriteria) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/get/writers/${findCriteria}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response.json();
    } catch (error) {
        return error;
    }
}
const getStories = async (findCriteria, flag) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/find/stories/${findCriteria}/${flag}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response.json();
    } catch (error) {
        return error;
    }
}


const getStoryWritersUsingStoryId = async (storyId) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/getStoryWritersUsingStoryId/${storyId}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response.json();
    } catch (error) {
        return error;
    }
}

export {
    getWriters,
    getStories,
    findWriters,
    getStoryWritersUsingStoryId
}