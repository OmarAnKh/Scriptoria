const getWriters = async (findCriteria) => {
    try {
        const response = await fetch(`http://localhost:5000/find/writers/${findCriteria}`, {
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
        const response = await fetch(`http://localhost:5000/get/writers/${findCriteria}`, {
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
        const response = await fetch(`http://localhost:5000/find/stories/${findCriteria}/${flag}`, {
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
export {
    getWriters,
    getStories,
    findWriters
}