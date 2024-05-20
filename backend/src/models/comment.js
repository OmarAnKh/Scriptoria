import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    accountId: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required : true
    },
    storyId: {
        type: Schema.Types.ObjectId,
        ref: 'Story',
        required : true
    },
    text: { type: String,
        required : true },
    likes : [{
        type: Schema.Types.ObjectId,
        ref: 'Account'
    }]
}, {
    timestamps: true,
});

commentSchema.index({ accountId: 1, storyId: 1, createdAt: 1 }, { unique: true });

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;