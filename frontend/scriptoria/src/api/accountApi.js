const findAccount = async (findCriteria) => {
    try {
        const response = await fetch("http://localhost:5000/user/find", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(findCriteria)

        })
        if (response.ok) {
            return response.json();
        }
    } catch (error) {
        console.log(error)
    }
}

const sendEmail = async (point, emailDetails) => {
    try {
        const response = await fetch("http://localhost:5000/" + point, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(emailDetails)
        })
        if (response.ok) {
            return response.json();
        }
        return response;

    } catch (error) {
        console.log(error)
    }
}

const editPassword = async (point, accountDetails) => {
    try {
        const response = await fetch("http://localhost:5000/" + point, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(accountDetails)
        })
        if (response.ok) {
            return response.json();
        }
        return response;

    } catch (error) {
        console.log(error)
    }
}


const logoutAccount = async (token) => {
    try {
        const response = await fetch("http://localhost:5000/account/logout", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token,
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


export {
    sendEmail,
    editPassword,
    findAccount,
    logoutAccount
}

