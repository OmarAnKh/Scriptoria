import mongoose from "mongoose";


const storySchema = new mongoose.Schema({
    language: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    coverPhoto: {
        type: Buffer
    },
    publishStatus: {
        type: Boolean,
        default: 0 // 0 = private, 1 = public
    },
    likes: {
        type: Number,
        default: 0
    },
    backgroundColor: {
        type: String,
        required: true
    },
    genres: [{
        type: String,
        required: true
    }],
    mainCharacters: [{
        type: String,
    }],
    MPAFilmRatings: {
        type: String,
        required: true
    },
    slides: [{ text: { type: String }}]
});

const Story = mongoose.model('Story', storySchema);


export default Story;