import mongoose, { Schema } from "mongoose";

const ratingSchema = new mongoose.Schema({
    AccountId: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },
    StoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Story'
    },
    rating: { type: Number },
});

ratingSchema.index({ AccountId: 1, StoryId: 1 }, { unique: true })
const Rating = mongoose.model('Rating', ratingSchema);

export default Rating

