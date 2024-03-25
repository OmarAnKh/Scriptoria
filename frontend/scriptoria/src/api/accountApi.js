const account = async (point, account) => {
    try {
        const response = await fetch("http://localhost:5000/" + point, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(account)
        })
        if (response.ok) {
            return response.json();
        }
        return response;


    } catch (error) {
        console.log(error)
    }
}


const findAccount = async (findCriteria) => {
    try {
        const response = await fetch("http://localhost:5000/user/find", {
            method: "POST",
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
const getAccountViaEmail = async (point, email) => {
    try {

        const response = await fetch("http://localhost:5000/" + point + "/" + email, {
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

const sendEmail = async (point, emailDetails) => {
    try {
        const response = await fetch("http://localhost:5000/" + point, {
            method: "POST",
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
const getAccountViaUserName = async (point, userName) => {
    try {
        const response = await fetch("http://localhost:5000/" + point + "/" + userName, {
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
export {
    account,
    getAccountViaEmail,
    sendEmail,
    editPassword,
    findAccount,
    getAccountViaUserName
}
