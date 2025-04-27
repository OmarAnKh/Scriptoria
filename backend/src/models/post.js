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
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

postSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Post = mongoose.model('Post', postSchema)

export default Post