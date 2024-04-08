import express from "express";
import Writers from "../models/writers.js";
import Account from "../models/account.js";
const router = express.Router();

router.get("/find/writers/:id", async (req, res) => {
    const StoryId = req.params.id
    try {
        let usersId

        const writers = await Writers.find({ StoryId })

        if (!writers) {
            return res.status(400).send({ state: false, error: "could'nt find any writer" })
        }
        if (writers.length !== 0) {
            usersId = writers.map(story => story.AccountId);
        }
        if (usersId.length !== 0) {
            const users = await Account.find({ _id: usersId })
            return res.status(200).send({ state: true, users })
        }
        return res.status(400).send({ state: false, error: "could'nt find any writer" })
    } catch (error) {
        return res.status(500).send({ state: false, error: "server error " })
    }
})


export default router;