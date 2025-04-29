import Post from "../models/post.js"; // Make sure your import includes .js if you're using ES modules

const createPost = async (req, res) => {
    try {
        const post = new Post(req.body);
        await post.save();
        res.status(201).json({ state: true, post });
    } catch (error) {
        res.status(400).json({ state: false, error: error.message });
    }
};

const updatePost = async (req, res) => {
    try {
        const { id, ...updates } = req.body;

        const post = await Post.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true
        });

        if (!post) {
            return res.status(404).json({ state: false, message: "Post not found" });
        }

        res.status(200).json({ state: true, post });
    } catch (error) {
        res.status(400).json({ state: false, error: error.message });
    }
};

const deletePost = async (req, res) => {
    try {
        const id = req.params.postId
        const post = await Post.findByIdAndDelete(id)
        if (!post) {
            return res.status(404).json({ state: false, message: "Post not found" });
        }
        res.status(200).send({ state: true, post });
    } catch (error) {
        res.status(400).json({ state: false, error: error.message });
    }
}
export default {
    createPost,
    updatePost,
    deletePost
};