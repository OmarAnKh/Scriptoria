import { findAccount } from "../api/accountApi";

const useAccount = () => {
    const getAccountByUserName = async (userName) => {
        try {
            const account = await findAccount({ userName });
            return account;
        } catch (error) {
            console.log(error);
        }
    }
    const getAccountByEmail = async (email) => {
        try {
            const account = await findAccount({ email });
            return account;
        } catch (error) {
            console.log(error);
        }
    }
    const getAccountById = async (_id) => {
        try {
            const account = await findAccount({ _id });
            return account;
        } catch (error) {
            console.log(error);
        }
    }
    return { getAccountByUserName, getAccountByEmail, getAccountById };
}

export default useAccount;