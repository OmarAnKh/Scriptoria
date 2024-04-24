import { useEffect, useState } from "react";
import JoinInput from "../join-input/JoinInput";
import { confirmPassword, deleteAccount, logoutAll } from "../../api/accountApi";
import useAuth from "../../hooks/useAuth";
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from "react-router-dom";

const ConfirmDeletePopup = (props) => {

    const t = props.t
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [passwordValid, setPasswordValid] = useState("rgb(33,33,33)");
    const [passwordValidMsg, setPasswordValidMsg] = useState("")
    const [modalDismiss, setModalDismiss] = useState("")

    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();

    const fetchConfirmed = async () => {

        try {
            const response = await confirmPassword('confirm/password', { userName: auth.userName, confirmedPassword: confirmedPassword });

            if (confirmedPassword === "") {
                setPasswordValid("red");
                setPasswordValidMsg("please enter your password")

            } else if(!response.message) {
                setPasswordValid("red");
                setPasswordValidMsg("Invalid Password")

            } else if(response.message) {
                setPasswordValid("green"); 
                setPasswordValidMsg("");

                setModalDismiss("modal")
                setAuth({});
                await logoutAll()
                await deleteAccount('account/delete', { userName: auth.userName })
                navigate('/logout');
            }
                
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!modalDismiss) {
          setModalDismiss("modal")
        }
    }, [modalDismiss]);

    
    return(
        <div className="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="deleteModalLabel">{t("Settings.delete_account_header")}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body mx-auto">
                        <p className="fw-bold text-center">{t("Settings.confirm_password")}</p>
                        <JoinInput method={setConfirmedPassword} type="password" color={passwordValid}/> 
                        <p className="text-center">{passwordValidMsg}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{t("Settings.cancel")}</button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss={`${modalDismiss}`} onClick={fetchConfirmed}>{t("Settings.confirm")}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const DeleteButton = () => {
    const { t } = useTranslation()

    return(
        <>           
            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal"> 
                <i className="bi bi-trash3 px-1"></i> 
                {t("Settings.delete_account")}
            </button>

            <ConfirmDeletePopup t={t}/>
        </>
    );
}

export default DeleteButton;