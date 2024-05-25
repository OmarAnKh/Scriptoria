import Comment from '../models/comment.js'
import Reply from '../models/replies.js'

const createComment = async (req, res) => {
    const comment = new Comment({
        text: req.body.text,
        storyId: req.body.storyId,
        accountId: req.user.id
    })
    try {
        await comment.save()
        res.send(comment)
    } catch (error) {
        res.status(400).send(error)
    }
}

const getCommentById = async (req, res) => {
    const storyId = req.params.id;
    try {
        const comments = await Comment.find({ storyId }).populate('accountId');
        if (!comments) return res.send(undefined);
        res.send(comments);
    } catch (error) {
        res.status(500).send();
    }
}

const getCommentCountByStoryId = async (req, res) => {
    const storyId = req.params.id
    try {
        const commentsCount = await Comment.countDocuments({ storyId });
        const repliesCount =  + await Reply.countDocuments({ storyId });
        const count = commentsCount + repliesCount;
        res.status(200).send({ counts: count })
    } catch (error) {
        res.status(500).send(error)
    }
}

const updateCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).send({});
        }
        comment.text = req.body.text
        comment.likes = req.body.likes
        await comment.save();

        res.send(comment);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

const deleteCommentById = async (req, res) => {
    try {
        
        const comment = await Comment.findOne({ _id: req.params.id, accountId: req.user.id });
        if (!comment) {
            return res.status(404).send();
        }
        await Reply.deleteMany({ originId: comment });
        await comment.deleteOne() 
        
        res.send(comment);
    } catch (error) {
        res.status(500).send(error);
    }
}

export default {
    createComment,
    getCommentById,
    getCommentCountByStoryId,
    updateCommentById,
    deleteCommentById
}