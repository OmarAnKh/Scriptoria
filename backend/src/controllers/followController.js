import Follow from "../models/follow.js";

const createFollow = async (req, res) => {
    const newFollow = new Follow(req.body);
    try {
        await newFollow.save();
        res.status(201).send({ status: true })
    } catch (error) {
        res.status(400).send({ error: "cant follow" });
    }
}

const getIfIFollowThisAccount = async (req, res) => {

    try {
        const user = await Follow.findOne({ account: req.params.user, follow: req.params.follow })
        if (user) {
            return res.status(200).send({ status: true })
        }
        return res.status(200).send({ status: false })
    } catch (error) {
        return res.status(500).send({ status: error })
    }
}

const unfollowAccount = async (req, res) => {
    try {
        const user = await Follow.findOneAndDelete({ account: req.body.account, follow: req.body.follow })


        if (user) {
            return res.status(200).send({ status: true })
        }
        return res.status(400).send({ status: false })
    } catch (error) {
        return res.status(500).send({ status: error })
    }
}

const getFollowerCount = async (req, res) => {
    try {
        const user = await Follow.countDocuments({ account: req.params.user });

        res.status(200).send({ followerCount: user });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

const getFollowingCount = async (req, res) => {
    try {
        const account = req.params.userId;

        const followingsNumber = await Follow.countDocuments({ follow: account });

        res.status(200).send({ followingsNumber: followingsNumber });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

export default {
    createFollow,
    getIfIFollowThisAccount,
    unfollowAccount,
    getFollowerCount,
    getFollowingCount
}