import mongoose, { Schema } from "mongoose";



const slideSchema = new mongoose.Schema({
    text: {
        type: String,
    },
    slideNumber: {
        type: Number,
        required: true,
    },
    storyId: {
        type: Schema.Types.ObjectId,
        ref: 'Story',
        required: true,
    },
});


slideSchema.index({ slideNumber: 1, storyId: 1 }, { unique: true });

const Slide = mongoose.model('Slide', slideSchema);

export default Slide;