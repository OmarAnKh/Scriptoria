import mongoose, { Schema } from "mongoose";

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    users: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'Account'
        },
        admin: {
            type: Boolean,
            default: false
        }
    }],
},{
    timestamps : true
});

const Room = mongoose.model('Chat', roomSchema);

export default Room