import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema({
    content: {
        type: String
    },
    media: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema)

export default Post