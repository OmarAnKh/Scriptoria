import axios from 'axios';

const sendRate = async (rate, token) => {
    try {
        await axios({
            url: "http://localhost:5000/rate",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + token,
            },
            data: rate
        });
        
        console.log(rate);
    } catch (error) {
        console.log(error);
    }
}

const getRate = async (AccountId, StoryId, token) => {
    try {
        const response = await axios({
            url: "http://localhost:5000/rate",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + token,
            },
            params: {
                AccountId,
                StoryId
            }
        });
        return response.data.rating;
    } catch (error) {
        console.log(error);
    }
}

const updateRate = async (id, rate, token) => {
    try {
        await axios({
            url: "http://localhost:5000/rate/" + id,
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + token,
            },
            data: rate
        });
        
        console.log(rate);
    } catch (error) {
        console.log(error);
    }
}

export {
    sendRate,
    updateRate,
    getRate
};
