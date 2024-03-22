
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

export {
    account, findAccount, sendEmail
}