import mongoose from "mongoose";

const invitationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true
    },
    story: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story",
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Invitation = mongoose.model("Invitation", invitationSchema);

export default Invitation;
