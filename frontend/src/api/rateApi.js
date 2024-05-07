import axios from 'axios';

const sendRate = async (rate, token) => {
    try {
        const res = await axios({
            url: `${process.env.REACT_APP_HOSTURL}/rate`,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + token,
            },
            withCredentials: true,
            data: rate
        });
        return res
    } catch (error) {
        console.log(error);
    }
}

const getRate = async (StoryId, token) => {
    try {
        const response = await axios({
            url: `${process.env.REACT_APP_HOSTURL}/rate/${StoryId}`,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + token,
            },
            withCredentials: true,
            data: { StoryId }
        });
        if (response.data) return response.data.rating;
        return undefined
    } catch (error) {
        console.log(error);
    }
}

const getStoryRates = async (point, storyId) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/${point}/${storyId}`, {
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

const updateRate = async (rate, token) => {

    try {
        const res = await axios({
            url: `${process.env.REACT_APP_HOSTURL}/rate/${rate.StoryId}`,
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + token,
            },
            withCredentials: true,
            data: rate
        });
        return res
    } catch (error) {
        console.log(error);
    }
}

export {
    sendRate,
    updateRate,
    getRate,
    getStoryRates
};
