
const acceptInvitation = async (invitationId, writer) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/acceptInvitation`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                invitation: {
                    invitationId
                },
                writer
            })
        })
        return response.json();

    }
    catch (error) {
        return error;
    }
}

const rejectInvitation = async (invitationId) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/rejectInvitation`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                invitationId
            })
        })
        return response.json();
    } catch (error) {
        return error;
    }
}
const getInvitationByID = async (invitationId) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/invitation/${invitationId}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response.json();
    } catch (error) {
        return error;
    }
}

const getInvitationsByStoryId = async (storyId) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/getInvitationsByStoryId/${storyId}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response.json();
    } catch (error) {
        return error;
    }
}


const deleteInvitationByReceiverIdAndStoryId = async (receiverId, storyId) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/deleteInvitationByReceiverIdAndStoryId/${receiverId}/${storyId}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response.json();
    } catch (error) {
        return error;
    }
}
export {
    acceptInvitation,
    rejectInvitation,
    getInvitationByID,
    getInvitationsByStoryId,
    deleteInvitationByReceiverIdAndStoryId
}