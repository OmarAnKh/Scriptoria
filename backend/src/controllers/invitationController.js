import Invitation from "../models/invitation.js";
import Writers from "../models/writers.js";

const createInvitation = async (req, res) => {
    const { sender, receiver, story } = req.body;

    try {
        const existingInvitation = await Invitation.findOne({
            receiver,
            story
        });
        if (existingInvitation) {
            return res.status(400).json({ message: "Invitation already exists" });
        }
        const invitation = new Invitation(req.body);
        await invitation.save();
        res.status(201).send(invitation);
    } catch (error) {
        res.status(400).send(error);
    }
};

const getInvitationByID = async (req, res) => {
    const invitationId = req.params.invitationId
    try {
        const invitation = await Invitation.findById(invitationId)

        return res.status(200).send({ state: true, invitation });
    } catch (error) {
        res.status(500).send({ state: false, error: "Server error" })
    }
}


const acceptInvitation = async (req, res) => {
    try {
        const invitation = await updateInvitationStatus(req.body.invitation.invitationId);
        if (!invitation) {
            return res.status(404).send({ state: false, error: "Invitation not found" });
        }

        const writer = await addWriterIfNotExists(req.body.writer);

        res.status(200).send({ state: true, message: "Invitation accepted and writer added", invitation, writer });
    } catch (error) {
        if (error.message === "User already exists") {
            return res.status(400).send({ state: false, error: error.message });
        }
        return res.status(500).send({ state: false, error: "Server error" });
    }
};


const updateInvitationStatus = async (invitationId) => {
    return await Invitation.findByIdAndUpdate(
        invitationId,
        { status: "accepted" },
        { new: true }
    );
};

const addWriterIfNotExists = async (writerData) => {
    const existingWriter = await Writers.findOne({
        AccountId: writerData.AccountId,
        StoryId: writerData.StoryId
    });

    if (existingWriter) {
        throw new Error("User already exists");
    }

    const writer = new Writers(writerData);
    await writer.save();
    return writer;
};


const rejectInvitation = async (req, res) => {
    try {
        const invitation = await Invitation.findByIdAndUpdate(
            req.body.invitationId,
            { status: "rejected" },
            { new: true });

        if (!invitation) {
            return res.status(404).send({ state: false, error: "Invitation not found" });
        }
        res.status(200).send({ state: true, message: "Invitation status updated", invitation });
    }
    catch (error) {
        return res.status(500).send({ state: false, error: "Server error" })
    }

}


const getInvitationsByStoryId = async (req, res) => {
    try {

        const users = await Invitation.find({
            story: req.params.storyId
        });

        res.status(200).send({ state: true, users });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ state: false, error: "Server error" });
    }
};

const deleteInvitationByReceiverIdAndStoryId = async (req, res) => {
    try {
        const invitation = await Invitation.findOneAndDelete({ receiver: req.params.receiver, story: req.params.story })
        if (!invitation) {
            return res.status(404).send({ state: false, error: "Invitation not found" });
        }
        res.status(200).send({ state: true, invitation });
    } catch (error) {
        return res.status(500).send({ state: false, error: "Server error" });
    }
}



export default {
    createInvitation,
    getInvitationByID,
    acceptInvitation,
    rejectInvitation,
    getInvitationsByStoryId,
    deleteInvitationByReceiverIdAndStoryId
}