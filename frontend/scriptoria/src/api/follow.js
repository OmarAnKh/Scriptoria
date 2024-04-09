const follows = async (point, user, follow) => {
    try {
        const response = await fetch("http://localhost:5000/" + point + "/" + user + "/" + follow, {
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
        console.log(error)
    }
}

const unfollow = async (point, obj) => {
    try {
        const response = await fetch("http://localhost:5000/" + point, {
            method: "delete",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj)
        })
        if (response.ok) {
            return response.json();
        }
        return response;


    } catch (error) {
        console.log(error)
    }
}

const followers = async (point, user) => {
    try {
        const response = await fetch('http://localhost:5000' + point + "/" + user, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Failed to fetch followers");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export {
    follows,
    unfollow,
    followers
}
