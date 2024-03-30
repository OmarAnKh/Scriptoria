const follows = async (point, user, follow) => {
    try {

        const response = await fetch("http://localhost:5000/" + point + "/" + user + "/" + follow, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (response.ok) {

            console.log(response)
            return response.json();
        }
        return response;
    } catch (error) {
        console.log(error)
    }
}

const unfollow = async (point, user, follow) => {
    const unfollowing = {
        user,
        follow
    }
    try {
        const response = await fetch("http://localhost:5000/" + point, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(unfollowing)
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

const followingCount = async (point, user) => {
    try {
        const response = await fetch('http://localhost:5000' + point + "/" + user, {
            method: "GET",
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
    followers,
    followingCount
}
