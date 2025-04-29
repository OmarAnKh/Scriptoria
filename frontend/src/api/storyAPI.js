
const story = async (point, story, token) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/${point}`, {
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
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/${point}/${UserId}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (response.ok) {
            return response.json();
        }
    } catch (error) {
        console.log(error)
    }
}

const findStory = async (criteria) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/search/${criteria}`, {
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

const getStories = async (point, limit) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/${point}?limit=${limit}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            }
        })

        if (response.ok) {
            return response.json()
        }
        return response

    } catch (error) {
        console.log(error)
    }
}

const getStory = async (id, point) => {
    try {
        if (id) {
            const response = await fetch(`${process.env.REACT_APP_HOSTURL}/${point}/${id}`, {
                credentials: "include"
            })
            if (response.ok) {
                return response.json()
            }

            return response
        } else {
            return ({ error: "no story to be found" })
        }
    } catch (error) {
        console.log(error)
    }
}

const getstory = async (id) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/stories/${id}`);
        if (response.ok) {
            return response.json();
        }
        return response;
    } catch (error) {
        console.log(error);
    }
}

const getGenrestory = async (selectedTab) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/storiesGenre/${selectedTab}`);
        if (response.ok) {
            return response.json();
        }
        return response;
    } catch (error) {
        console.log(error);
    }
}


const deleteStory = async (storyId) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/delete/story/${storyId}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            }
        })
        if (response.ok) {
            return response.json()
        }
        return response
    } catch (error) {
        console.log(error)
    }
}

const addSlideApi = async (storyId) => {
    try {
        console.log(storyId)
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/story/addSlide/${storyId}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            }
        })
        if (response.ok) {
            return response.json()
        }
        return response
    } catch (error) {
        console.log(error)
    }
}

const getStoryByItsID = async (storyId) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/story/${storyId}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            }
        })

        return response.json()
    } catch (error) {
        console.log(error)
    }
}

export {
    story,
    writerStory,
    findStory,
    getStories,
    getStory,
    getstory,
    getGenrestory,
    deleteStory,
    addSlideApi,
    getStoryByItsID

}