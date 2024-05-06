
const createLike = async (point, document, token) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/${point}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(document)
        })
        if (response.ok) {
            return response.json();
        }
        return response;

    } catch (error) {
        console.log(error)
    }
}

const getLike = async (point, accountId, storyId) => {

    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/${point}?AccountId=${accountId}&StoryId=${storyId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        if (response.ok) {
            return response.json();
        }
        return response;
    } catch (error) {
        console.log(error)
    }
}

const deleteLike = async (point, document) => {

    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/${point}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(document)
        })
        if (response.ok) {
            return response.json();
        }
        return response;

    } catch (error) {
        console.log(error)
    }
}

export {
    createLike,
    getLike,
    deleteLike
}