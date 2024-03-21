
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
    account,getAccountViaUserName
}