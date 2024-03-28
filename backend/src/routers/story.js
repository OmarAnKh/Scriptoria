import Story from "../models/story.js"
import Writers from "../models/writers.js";
import authentication from "../middleware/authentication.js"
const router = new express.Router()

router.post("/story", authentication, async (req, res) => {
    const story = new Story(req.body);
    try {
        await story.save();
        const writers = new Writers({
            AccountId: req.user._id,
            StoryId: story._id
        })
        await writers.save()
        res.status(201).send({ story, writers })
    } catch (error) {
        res.status(400).send("error");
    }
})



export default router