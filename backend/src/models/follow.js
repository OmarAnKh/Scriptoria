import mongoose from "mongoose";

const followSchema = new mongoose.Schema({
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
    },
    follow_id: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
    },
});

followSchema.index({ account: 1, follow_id: 1 }, { unique: true });

const follow = mongoose.model('Follow', followSchema);

export default follow;