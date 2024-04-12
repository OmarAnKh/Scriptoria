import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";

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

        // setTimeout(() => {
        //     setNewRefreshTone(true);
        // }, 25000)

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
                    <p>Loading...</p>
                    : <Outlet />}
        </>
    );
};

export default PersistLogin;
