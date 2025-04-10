import mongoose, { Schema } from "mongoose";

const writersSchema = new mongoose.Schema({
    AccountId: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },
    StoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Story'
    },
    publishDate: {
        type: Date
    },
    rule: {
        type: String,
        required: true
    }
});

writersSchema.index({ AccountId: 1, StoryId: 1 }, { unique: true });

const Writers = mongoose.model('Writers', writersSchema);

export default Writers;
