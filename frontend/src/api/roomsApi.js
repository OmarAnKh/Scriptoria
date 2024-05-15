import axios from 'axios'

const createRoom = async (room, token) => {
    try {
        const res = await axios({
            url: `${process.env.REACT_APP_HOSTURL}/room`,
            method: "POST",
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + token,
            },
            data: room
        })
        return res
    } catch (error) {
        console.log(error)
    }
}

const getRooms = async (userId, token)=>{ 
    if(!userId) return {status : 404, data : []}
        try {
            const res = await axios({
                url: `${process.env.REACT_APP_HOSTURL}/room/${userId}`,
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

const updateRoom = async(room, token)=>{
    try{
        const res = await axios({
            url: `${process.env.REACT_APP_HOSTURL}/room`,
            method: "PATCH",
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + token,
            },
            data: room 
        })
        return res
    } catch(error) {
        console.log(error)
    }
}

const deleteRoom = async (roomId, token)=>{
    try{
        const res = await axios({
            url: `${process.env.REACT_APP_HOSTURL}/room/${roomId}`,
            method: "DELETE",
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + token,
            }
        })
        return res
    } catch(error) {
        console.log(error)
    }
}

export {
    createRoom,
    getRooms,
    deleteRoom,
    updateRoom
}