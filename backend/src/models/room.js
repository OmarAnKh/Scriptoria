import mongoose, { Schema } from "mongoose";

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'Account',
    }],
});


const Room = mongoose.model('Chat', roomSchema);

export default Room