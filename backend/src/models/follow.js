import mongoose, { Schema } from "mongoose";

const followSchema = new mongoose.Schema({
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    follow: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
});

followSchema.index({ account: 1, follow: 1 }, { unique: true });

const follow = mongoose.model('Follow', followSchema);

export default follow;