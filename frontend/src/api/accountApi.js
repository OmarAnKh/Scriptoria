const findAccount = async (findCriteria) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/user/find`, {
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



const editPassword = async (point, accountDetails) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/${point}`, {
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

const confirmPassword = async (point, accountDetails) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/${point}`, {
            method: "POST",
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

const logoutAll = async (token) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/account/logoutAll`, {
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

const logoutAccount = async (token) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/account/logout`, {
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

const deleteAccount = async (point, document) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/${point}`, {
            method: "DELETE",
            credentials: "include",
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

const getFriends = async (userId) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/getFriends/${userId}`, {
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

const getListOfAccountsInformationByAnArrayOfIds = async (invitations) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/getListOfAccountsInformationByAnArrayOfIds`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(invitations)
        })
        return response.json();
    } catch (error) {
        console.log(error,10)
    }
}

export {
    editPassword,
    findAccount,
    logoutAccount,
    confirmPassword,
    logoutAll,
    deleteAccount,
    getFriends,
    getListOfAccountsInformationByAnArrayOfIds
}

