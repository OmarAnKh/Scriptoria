const useSlide = (documentId) => {
    const addSlide = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_HOSTURL}/story/addSlide/${documentId}`, {
                method: "POST",
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

    const deleteSlide = async (index) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_HOSTURL}/story/delete/${documentId}/${index}`, {
                method: "DELETE",
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

    return { addSlide, deleteSlide }
}

export default useSlide