const saveDocument = async (point, document) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/${point}`, {
            method: "POST",
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

const sendEmail = async (point, emailDetails) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/${point}`, {
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


const deleteDocument = async (point, document) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/${point}/delete`, {
            method: "delete",
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


const updateDocument = async (point, document) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/${point}/update`, {
            method: "PATCH",
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

const getDocumentByUsingParams = async (point, params) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/${point}/${params}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
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
    saveDocument,
    sendEmail,
    updateDocument,
    deleteDocument,
    getDocumentByUsingParams
}
