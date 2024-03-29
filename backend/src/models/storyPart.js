import mongoose, { Schema } from "mongoose";

const storyPartSchema = new mongoose.Schema({
    storyName: {
        type: String,
    },
    part: {
        type: Number,
    },
    StoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Story',
    },
});

storyPartSchema.index({ storyName: 1, part: 1, StoryId: 1 }, { unique: true });

const StoryPart = mongoose.model('StoryPart', storyPartSchema);

export default StoryPart