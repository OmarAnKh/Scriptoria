const getWriters = async (findCriteria) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/find/writers/${findCriteria}`, {
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
const findWriters = async (findCriteria) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/get/writers/${findCriteria}`, {
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
const getStories = async (findCriteria, flag) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/find/stories/${findCriteria}/${flag}`, {
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


const getInvitation = async (invitationId) => {
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

const invitationResponse = async (invitationId, invitationStatus) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/invitationResponse`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                invitationId,
                invitationStatus
            })
        });

        return response.json();
    } catch (error) {
        return error;
    }
};

export {
    getWriters,
    getStories,
    findWriters,
    getInvitation,
    invitationResponse
}