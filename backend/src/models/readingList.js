import mongoose, { Schema } from "mongoose";

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
    stories: [{
        type: Schema.Types.ObjectId,
        ref: 'Story',
    }],
    privacy: {
        type: Boolean,
        default: false
    }
});

readingListSchema.index({ accountId: 1, name: 1 }, { unique: true });

const ReadingList = mongoose.model('ReadingList', readingListSchema);

export default ReadingList