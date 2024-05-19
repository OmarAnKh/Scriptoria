import Reply from '../models/replies.js'

const createReply = async (req, res)=>{
    const reply = new Reply({
        storyId: req.body.storyId,
        originId: req.body.originId,
        replier : req.body.replier,
        repliedTo : req.body.repliedTo,
        text: req.body.text
    })
    try {
        await reply.save()
        res.send(reply)
    } catch (error) {
        res.status(400).send(error)
    }
}

const getRepliesByStoryId = async (req, res)=>{
    const storyId = req.params.storyId
    // const originId = req.params.originId
    try{
        const replies = await Reply.find({storyId}).populate('replier').populate('repliedTo')
        if(!replies || replies.length === 0) return res.status(404).send([])
        res.send(replies)
    } catch(error) {
        res.status(500).send(error)
    }
}

const updateReplyById = async (req, res)=>{
    const text = req.body.text
    const likes = req.body.likes
    try{
        const reply = await Reply.findById(req.params.id)
        if(!reply) return res.status(404).send({})
        reply.text = text
        reply.likes = likes
        await reply.save()
        res.send(reply)
    } catch(error) {
        res.status(500).send(error)
    }
}

const deleteReplyById = async (req, res)=>{
    try{
        const reply = await Reply.findByIdAndDelete(req.params.id)
        if(!reply) res.status(404).send({})
        res.send(reply)
    } catch(error) {
        res.status(500).send(error)
    }
}

export default {
    createReply,
    getRepliesByStoryId,
    updateReplyById,
    deleteReplyById
}