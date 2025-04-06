import Story from '../models/story.js'

const findDocument = async (id) => {
    if (id == null) return;

    let document = await Story.findById(id);
    if (!document) {
        return null;
    }
    return document;
}

const applyChangesAndBroadcast = async (socket, documentId, text, roomId, index) => {
    try {
        const document = await Story.findById(documentId);
        document.slides[index].text = text;
        await document.save();
        console.log(roomId)
        socket.broadcast.to(roomId).emit("receive-changes", text);
    } catch (error) {
        console.log(error);
    }

}

export { findDocument, applyChangesAndBroadcast };
