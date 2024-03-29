
import axios from 'axios'
const sendRate = async (rate) => {
    try {
        await axios({
            url: "http://localhost:5000/rate",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            data: rate
        });
        
        console.log(rate)
    } catch (error) {
        console.log(error);
    }
}

export {sendRate}