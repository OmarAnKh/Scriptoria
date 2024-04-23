
const story = async (point, story, token) => {
    try {
        const response = await fetch("http://localhost:5000/" + point, {
            method: "POST",
            credentials: "include",
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
            credentials: "include",
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
            credentials: "include",
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

const getStory = async (id, point) => {
    try {
        if(id){
            const response = await fetch("http://localhost:5000/" + point + "/" + id, {
            credentials: "include"
        })
        if (response.ok) {
            return response.json()
        }

        return response
        } else {
            return ({error : "no story to be found"})
        }
    } catch (error) {
        console.log(error)
    }
}

const getstory = async (id) => {
    try {
        const response = await fetch(`http://localhost:5000/stories/${id}`);
        if (response.ok) {
            return response.json();
        }
        return response;
    } catch (error) {
        console.log(error);
    }
}

export {
    story,
    writerStory,
    findStory,
    getStory,
    getstory
}