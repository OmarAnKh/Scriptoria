
const story = async (point, story, token) => {
    try {
        const response = await fetch("http://localhost:5000/" + point, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(story)
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
    story
}