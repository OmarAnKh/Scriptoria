import { saveDocument } from "../api/API's"
import { followers, followings, follows, unfollow } from "../api/follow"

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
        try {
            return await followers("/followers", id);
        } catch (error) {
            console.log(error)
        }
    }

    const getfollowingCount = async (id) => {
        try {
            return await await followings(id);
        } catch (error) {
            console.log(error)
        }
    }

    const isFollowing = async (accountFrom, accountTo) => {
        try {
            const res = await follows("following", accountFrom, accountTo);
            return res
        } catch (error) {
            console.log(error)
        }
    }

    return { setFollow, unFollow, getFollowerCount, isFollowing, getfollowingCount }
}

export default useFollow