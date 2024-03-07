

const createAccount = async (account) => {
    console.log(account)
    try {
        const response = await fetch("http://localhost:5000/SignUp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(account)
        })
    } catch (error) {
        console.log(error)
    }
}

export {
    createAccount
}