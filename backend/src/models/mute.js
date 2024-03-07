import mongoose, { Schema } from "mongoose";

const MuteSchema = new Schema({
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
    },
    Mute_id: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
    },
});


MuteSchema.index({ account: 1, Mute_id: 1 }, { unique: true });

const Mute = mongoose.model('Mute', MuteSchema);

export default Mute;