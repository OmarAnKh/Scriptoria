import UploadImg from "./UploadImg";
import avatar from "../../img/avatar.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

const AddProfile = (props) => {
    const { t } = useTranslation()
    
    const navigate = useNavigate();
    const [modalDismiss, setModalDismiss] = useState("")


    useEffect(() => {
        if (!modalDismiss) {
            setModalDismiss("modal")
        }
    }, [modalDismiss]);

    return(
        <>
            <button className="upload-button" data-bs-toggle="modal" data-bs-target="#profileModal"> 
                <img src={props.imgURL} className="rounded-circle image-img" style={{ width: "150px" }} alt="Profile Logo" />
                <i className="bi bi-camera image-icon"></i>
            </button>

            <div className="modal fade" id="profileModal" aria-labelledby="profileModalLabel">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title fs-5" id="profileModalLabel">{t("Settings.add_to_profile")}</h3>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body d-flex justify-content-between text-center align-items-center mx-5">
                        <div>
                            <h5 id="profileModalLabel">{t("Settings.profile_picture")}</h5>
                            <UploadImg imgURL={props.imgURL} setImgURL={props.setImgURL} width={120}/>
                        </div>
                        <div>
                            <h5 id="profileModalLabel">{t("Settings.avatar")}</h5>
                            <button className="btn" onClick={() => { navigate(`/UpdateAvatars`) }} data-bs-dismiss={`${modalDismiss}`}>
                                <img src={avatar} className="img-fluid image-img" alt="avatar icon" style={{width: '120px'}}/>
                            </button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddProfile;