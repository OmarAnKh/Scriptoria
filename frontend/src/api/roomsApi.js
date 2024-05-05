import axios from 'axios'

const createRoom = async (room, token) => {
    try {
        const res = await axios({
            url: "http://localhost:5000/room",
            method: "POST",
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + token,
            },
            data: room
        })
        console.log(res)
        return res
    } catch (error) {
        console.log(error)
    }
}

const getRooms = async (userId, token)=>{ 
        try {
            const res = await axios({
                url: "http://localhost:5000/room/" + userId,
                method: "GET",
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer ' + token,
                }
            });
            return res; 
        } catch (error) {
            console.log(error);
        }   
}

export {
    createRoom,
    getRooms
}