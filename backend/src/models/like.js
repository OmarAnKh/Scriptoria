import mongoose, { Schema } from "mongoose";

const likesSchema = new mongoose.Schema({
    AccountId: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },
    StoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Story'
    },
    publishDate: { type: Date },
});

likesSchema.index({ AccountId: 1, StoryId: 1 }, { unique: true });

const Like = mongoose.model('Like', likesSchema);

export default Like;
