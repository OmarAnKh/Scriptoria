
const story = async (point, story, token) => {
    try {
        const response = await fetch("http://localhost:5000/" + point, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(story)
        })
        if (response.ok) {
            return response.json();
        }
        return response;


    } catch (error) {
        console.log(error)
    }
}


const writerStory = async (point, UserId) => {
    try {
        const response = await fetch("http://localhost:5000" + point + "/" + UserId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (response.ok) {
            return response.json();
        }
        throw new Error("Failed to fetch stories: " + response.status);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const findStory = async (criteria) => {
    try {
        const response = await fetch(`http://localhost:5000/search/${criteria}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (response.ok) {
            return response.json();
        }
        return response;
    } catch (error) {


    }
}

export {
    story,
    writerStory,
    findStory
}