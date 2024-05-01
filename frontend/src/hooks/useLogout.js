import { logoutAccount } from "../api/accountApi";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            const response = await logoutAccount();
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout