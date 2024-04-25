import express from "express";
import Writers from "../models/writers.js";
import Account from "../models/account.js";

const router = express.Router();

router.get("/find/writers/:id", async (req, res) => {
    const StoryId = req.params.id;
    try {
        let usersId;

        const writers = await Writers.find({ StoryId });
        
        if (!writers || writers.length === 0) {
            return res.status(400).send({ state: false, error: "Couldn't find any writer" });
        }
        usersId = writers.map(story => story.AccountId);
        
        if (usersId.length !== 0) {
            const users = await Account.find({ _id: usersId });
            const count = await Writers.countDocuments({ AccountId: { $in: usersId } });
            return res.status(200).send({ state: true, users, count }); 
        }

        return res.status(400).send({ state: false, error: "Couldn't find any writer" });
    } catch (error) {
        return res.status(500).send({ state: false, err: "Server error", error });
    }
});


router.post("/Writer", async (req, res) => {
    try {
        const user = await Writers.findOne({ AccountId: req.body.AccountId })
        if (user) {
            return res.status(400).send({ message: false })
        }
        const writer = new Writers(req.body)
        await writer.save()
        return res.status(200).send({ message: true, writer })
    } catch (error) {
        return res.status(500).send({ message: false })
    }
})

export default router;

