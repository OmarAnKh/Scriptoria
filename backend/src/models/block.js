import mongoose, { Schema } from "mongoose";

const blockSchema = new mongoose.Schema({
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
    },
    block: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
    },
});


blockSchema.index({ account: 1, block: 1 }, { unique: true });

const Block = mongoose.model('Block', blockSchema);

export default Block;