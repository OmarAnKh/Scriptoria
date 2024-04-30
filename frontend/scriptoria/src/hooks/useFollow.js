import { saveDocument } from "../api/API's"
import { followers, unfollow } from "../api/follow"

const useFollow = () => {
    const setFollow = async (data) => {
        try {
            const res = await saveDocument("follow", data)
        } catch (error) {
            console.log(error)
        }
    }

    const unFollow = async (data) => {
        try {
            const res = await unfollow("unfollow", data)
        } catch (error) {
            console.log(error)
        }
    }

    const getFollowerCount = async (id) => {
        return await followers("/followers", id);
    }

    return { setFollow, unFollow, getFollowerCount }
}

export default useFollow