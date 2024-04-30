import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";
import LoadingPage from '../loading-page/LoadingPage.js'

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    const [newRefreshTone, setNewRefreshTone] = useState(true)

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.log(error);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        if (!auth?.token) {
            verifyRefreshToken();
        } else {
            setIsLoading(false);
        }
        setNewRefreshTone(true);

        return () => {
            isMounted = false;
        };
    }, [auth?.token, refresh, setNewRefreshTone]);

    // useEffect(() => {
    //     console.log(`isLoading: ${isLoading}`);
    //     console.log(`aT: ${JSON.stringify(auth?.token)}`);
    // }, [isLoading, auth?.token]);

    return (
        <>
            {
                isLoading ?
                    <LoadingPage />
                    : <Outlet />}
        </>
    );
};

export default PersistLogin;
