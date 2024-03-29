import mongoose from "mongoose";

const readingListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    accountId: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    storyId: {
        type: Schema.Types.ObjectId,
        ref: 'Story',
        required: true,
    },
});

readingListSchema.index({ accountId: 1, storyId: 1, name: 1 }, { unique: true });

const ReadingList = mongoose.model('ReadingList', readingListSchema);


export default ReadingList