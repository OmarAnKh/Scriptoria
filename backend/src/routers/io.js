import Story from '../models/story.js'

const defaultValue = "";

const findDocument = async (id) => {
    if (id == null) return;

    let document = await Story.findById(id);
    if (!document) {
        document.slide = defaultValue;
        await document.save();
    }
    return document;
}

const applyChangesAndBroadcast = async (socket, documentId, delta) => {
    try {
        const document = await Story.findById(documentId);
        document.slide += delta;
        await document.save();
        socket.broadcast.to(documentId).emit("receive-changes", delta);
    } catch (error) {
        console.log(error);
    }

}

export { findDocument, applyChangesAndBroadcast };
