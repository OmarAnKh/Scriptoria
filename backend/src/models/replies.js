import mongoose, { Schema } from "mongoose";

const replySchema = new Schema({
    storyId: {
        type: Schema.Types.ObjectId,
        ref: 'Story',
        required: true
    },
    originId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        required: true
    },
    replier: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    repliedTo: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },
    text: {
        type: String,
        required: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Account'
    }]
}, {
    timestamps: true,
});

const Reply = mongoose.model('Reply', replySchema);
export default Reply;