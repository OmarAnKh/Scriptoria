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

postSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Post = mongoose.model('Post', postSchema)

export default Post