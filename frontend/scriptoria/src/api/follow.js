const follows = async (point, user, follow) => {
    try {

        const response = await fetch("http://localhost:5000/" + point + "/" + user + "/" + follow, {
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
        console.log(error)
    }
}

const unfollow = async (point, obj) => {
    try {
        const response = await fetch("http://localhost:5000/" + point, {
            method: "delete",
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

export {
    follows,
    unfollow
}
