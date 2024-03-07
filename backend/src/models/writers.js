import mongoose from "mongoose";

const writersSchema = new mongoose.Schema({
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

writersSchema.index({ AccountId: 1, StoryId: 1 }, { unique: true });

const writers = mongoose.model('Write', writersSchema);

export default writers