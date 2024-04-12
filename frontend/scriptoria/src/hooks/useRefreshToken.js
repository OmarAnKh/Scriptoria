import axios from '../api/axios.js'
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            return { userName: response.data.userName, token: response.data.accessToken }
        })
        return response.data.accessToken
    }
    return refresh;
}

export default useRefreshToken