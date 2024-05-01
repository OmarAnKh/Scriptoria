
const usePassword = () => {
    const isValidPassword = (password) => {
        const passwordRe = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/
        if (passwordRe.test(password)) {
            return true;
        }
        return false
    }
    return { isValidPassword }
}

export default usePassword