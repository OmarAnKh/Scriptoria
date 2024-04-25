import React, { useEffect, useState } from 'react';
import "./Settings.css";
import SettingsButton from "./SettingsButton";
import SettingsInfo from "./SettingsInfo";
import logo from "../../img/content.png";
import SettingsSelect from './SettingsSelect';
import { findAccount } from '../../api/accountApi';
import { useNavigate, useParams } from 'react-router-dom';
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import Navbar from '../navbar/Navbar';
import { updateDocument } from '../../api/API\'s';
import AlertWithTime from '../alert/AlertWithTime';
import {toast} from 'react-hot-toast'
import { useTranslation } from 'react-i18next';
import DeleteButton from './DeleteButton';

const uploader = Uploader({
    apiKey: "free"
});

const options = { multi: true };


const CardSettingsInfo = (props) => {
    return (
        <div className={`card card-body-settings ${props.className}`}>
            <div className={`card-body ${props.cardBodyClassName}`}>
                {props.children}
            </div>
        </div>
    );
}

const CardInput = (props) => {
    return (
        <div className={props.className + " row"}>
            <div className="col">
                <label>{props.title}</label>
                <input className="form-control settings-card-input" value={props.value} disabled={props.disabled} onChange={(event) => {
                    props.method(event.target.value);
                }} />
                <p className='settings-error'>{props.error}</p>
            </div>
        </div>
    )
}

const CardInputEditBody = (props) => {
    return (
        <>
            <div className='d-flex justify-content-between'>
                <p className='description-top-text'>{props.title}</p>
                {props.element}
            </div>
            <div className="container">
                <div className='d-flex justify-content-between'>
                    <div className="row">
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    );
}

const Settings = () => {
    const { t } = useTranslation()
    const settingsButtonObject = [
        {
            className: "nav-link active nav-link-settings",
            id: "v-pills-userInfo-tab",
            dataBsToggle: "pill",
            dataBsTarget: "#v-pills-userInfo",
            type: "button",
            role: "tab",
            ariaControls: "v-pills-userInfo",
            ariaSelected: true,
            disabled: false,
            title: t("Settings.user_Info"),
            classNameIcon: "bi bi-question-square-fill"
        },
        {
            className: "nav-link nav-link-settings",
            id: "v-pills-privacy-tab",
            dataBsToggle: "pill",
            dataBsTarget: "#v-pills-privacy",
            type: "button",
            role: "tab",
            ariaControls: "v-pills-privacy",
            ariaSelected: false,
            disabled: false,
            title: t("Settings.privacy"),
            classNameIcon: "bi bi-shield-lock-fill"
        },
        {
            className: "nav-link nav-link-settings",
            id: "v-pills-security-tab",
            dataBsToggle: "pill",
            dataBsTarget: "#v-pills-security",
            type: "button",
            role: "tab",
            ariaControls: "v-pills-security",
            ariaSelected: false,
            disabled: false,
            title: t("Settings.security"),
            classNameIcon: "bi bi-lock-fill"
        },
        {
            className: "nav-link nav-link-settings",
            id: "v-pills-termsOfUse-tab",
            dataBsToggle: "pill",
            dataBsTarget: "#v-pills-termsOfUse",
            type: "button",
            role: "tab",
            ariaControls: "v-pills-termsOfUse",
            ariaSelected: false,
            disabled: false,
            title: t("Settings.terms"),
            classNameIcon: "bi bi-layout-text-sidebar-reverse"
        },
        {
            className: "nav-link nav-link-settings",
            id: "v-pills-support-tab",
            dataBsToggle: "pill",
            dataBsTarget: "#v-pills-support",
            type: "button",
            role: "tab",
            ariaControls: "v-pills-support",
            ariaSelected: false,
            disabled: false,
            title: t("Settings.support"),
            classNameIcon: "bi bi-headset"
        }
    ];

    const [inputDisabled, setInputDisabled] = useState(true);
    const [textareaDisabled, setTextareaDisabled] = useState(true);
    const [inputEventTypeFlag, setInputEventTypeFlag] = useState(true);
    const [inputEventType, setInputEventType] = useState(t("Settings.edit"));
    const [textAreaEventTypeFlag, setTextAreaEventTypeFlag] = useState(true);
    const [textAreaEventType, setTextAreaEventType] = useState(t("Settings.edit"));
    const [account, setAccount] = useState({})
    const { id } = useParams();
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [gender, setGender] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [region, setRegion] = useState("");
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");
    const [imgURL, setImgURL] = useState(logo)

    const [error, setError] = useState("");
    const [alertMsg, setAlertMsg] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedAccount = await findAccount({ _id: id });
                setAccount(fetchedAccount);
                setUserName(fetchedAccount.user.userName || "");
                setGender(fetchedAccount.user.gender || "");
                setDisplayName(fetchedAccount.user.displayName || "");
                setRegion(fetchedAccount.user.region || "");
                setDescription(fetchedAccount.user.description || "");
                setEmail(fetchedAccount.user.email);
                if (!fetchedAccount.user.profilePicture) {
                    return setImgURL(logo)
                }
                setImgURL(`data:image/png;base64,${fetchedAccount.user.profilePicture}`)
            } catch (error) {
                console.error("Error fetching account data:", error);
            }
        };

        fetchData();

        return () => { };
    }, [id]);

    const handalClickEditAndSaveInput = async () => {
        if (inputEventTypeFlag === true) {
            setInputDisabled(!inputDisabled);
            setInputEventType(t("Settings.save"));
            setInputEventTypeFlag(false)
            return;
        }
        const updateUser = { _id: id }
        if (account.user.userName !== userName) {
            let isFindAccount = await findAccount({ userName })
            if (isFindAccount.message) {
                return setError("user name already exists");
            }
            updateUser.userName = userName;
        }
        if (account.user.gender !== gender) {
            updateUser.gender = gender;
        }
        if (account.user.displayName !== displayName) {
            updateUser.displayName = displayName;
        }
        if (account.user.region !== region) {
            updateUser.region = region;
        }
        if (updateUser.userName || updateUser.gender || updateUser.displayName || (updateUser.region !== "")) {
            try {
                if (updateUser.region === "") {
                    delete updateUser.region;
                }
                setError("")
                const response = await updateDocument("account", updateUser);
            } catch (error) {
                console.log("error", error)
            }

        }

        setInputDisabled(!inputDisabled);
        setInputEventType(t("Settings.edit"));
        setInputEventTypeFlag(true)
    }

    const handalClickEditAndSaveTextArea = async () => {
        if (textAreaEventTypeFlag === true) {
            setTextareaDisabled(!textareaDisabled);
            setTextAreaEventType(t("Settings.save"));
            return;
        }
        const updateUser = { _id: id }
        if (account.user.description !== description) {
            updateUser.description = description;
        }
        if (updateUser.description) {
            try {
                const response = await updateDocument("account", updateUser);
            } catch (error) {
                console.log("error", error)
            }
        }
        setTextareaDisabled(!textareaDisabled);
        setTextAreaEventType(t("Settings.edit"));
        setTextAreaEventTypeFlag(false)
    }

    const handalClickProfilePicture = async () => {
        try {
            const response = await updateDocument("account", { profilePicture: imgURL, _id: id });
            setAlertMsg(true);
            setTimeout(() => {
                setAlertMsg(false);
            }, 3000)
        } catch (error) {
            console.log("error", error)
        }
    }

    const handalEditPassword = () => {
        navigate(`/ResetPassword`, { state: { email } });
    }

    return (
        <div className="settings-page-top-body">

            <Navbar />
            <div className="container-fluid my-5">
                {alertMsg ? toast.success('image saved') : ""}
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <div className="settings-page-header py-4">
                            <span className="edit-profile-text">{t("Settings.settings")}</span>
                        </div>
                        <div className="row">
                            <div className="col-md-2">
                                <div className="nav flex-md-column  nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    {
                                        settingsButtonObject.map((settingsButton, idx) => {
                                            return (
                                                <React.Fragment key={idx}>

                                                    <SettingsButton
                                                        className={settingsButton.className}
                                                        id={settingsButton.id}
                                                        dataBsToggle={settingsButton.dataBsToggle}
                                                        dataBsTarget={settingsButton.dataBsTarget}
                                                        type={settingsButton.type}
                                                        role={settingsButton.role}
                                                        ariaControls={settingsButton.ariaControls}
                                                        ariaSelected={settingsButton.ariaSelected}
                                                        disabled={settingsButton.disabled}
                                                        title={settingsButton.title}
                                                        classNameIcon={settingsButton.classNameIcon}
                                                    />
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="col-md-10">
                                <div className="tab-content" id="v-pills-tabContent">
                                    <SettingsInfo className="tab-pane fade show active settings-info-body" id="v-pills-userInfo" role="tabpanel" ariaLabelledby="v-pills-userInfo-tab" tabIndex={0} >
                                        <CardSettingsInfo cardBodyClassName="d-flex align-items-end">
                                            <div className="d-flex align-items-start">
                                                <UploadButton uploader={uploader}
                                                    options={options}
                                                    onComplete={files => setImgURL(files.map(x => x.fileUrl).join("\n"))}>
                                                    {({ onClick }) =>
                                                        <button onClick={onClick} className="upload-button">
                                                            <img src={imgURL} className="rounded-circle image-img" style={{ width: "150px" }} alt="Profile Logo" />
                                                            <i className="bi bi-camera image-icon"></i>
                                                        </button>
                                                    }
                                                </UploadButton>
                                                <div className="ms-3 my-3">
                                                    <h5>{displayName}</h5>
                                                    <p className='user-name-text'>@{userName}</p>
                                                    <SettingsButton className="sttings-edit-button" title={t("Settings.save")} classNameIcon="bi bi-pencil" method={handalClickProfilePicture} />
                                                </div>
                                            </div>
                                        </CardSettingsInfo>

                                        <CardSettingsInfo className="mt-3">
                                            <CardInputEditBody title={t("Settings.user_Information")} element={<SettingsButton className="sttings-edit-button" title={inputEventType} classNameIcon="bi bi-pencil" method={handalClickEditAndSaveInput} />}>
                                                <CardInput className="col" title={t("Settings.user_name")} value={userName} disabled={inputDisabled} method={setUserName} error={error} />
                                                <CardInput className="col" title={t("Settings.display_name")} value={displayName} disabled={inputDisabled} method={setDisplayName} />
                                                <div className="w-100 my-3" />
                                                <SettingsSelect title={t("Settings.gender")} selectType="gender" value={gender} disabled={inputDisabled} method={setGender} />
                                                <SettingsSelect title={t("Settings.county")} selectType="countries" value={region} disabled={inputDisabled} method={setRegion} />
                                            </CardInputEditBody>
                                        </CardSettingsInfo>

                                        <CardSettingsInfo className="mt-3">
                                            <CardInputEditBody title={t("Settings.description")} element={<SettingsButton className="sttings-edit-button" title={textAreaEventType} classNameIcon="bi bi-pencil" method={handalClickEditAndSaveTextArea} />}>
                                                <textarea
                                                    rows={20}
                                                    cols={70}
                                                    placeholder={t("Settings.desPlaceholder")}
                                                    value={description}
                                                    disabled={textareaDisabled}
                                                    onChange={(event) => {
                                                        setDescription(event.target.value)
                                                    }}
                                                />
                                            </CardInputEditBody>
                                        </CardSettingsInfo>
                                    </SettingsInfo>

                                    <SettingsInfo className="tab-pane fade settings-info-body" id="v-pills-privacy" role="tabpanel" aria-labelledby="v-pills-privacy-tab" tabIndex={0}>
                                        {t("Settings.privacy")}

                                        <CardSettingsInfo cardBodyClassName="d-flex align-items-end">
                                            <div className="d-flex align-items-start px-5">
                                                <UploadButton uploader={uploader}
                                                    options={options}
                                                    onComplete={files => setImgURL(files.map(x => x.fileUrl).join("\n"))}>
                                                    {({ onClick }) =>
                                                        <button onClick={onClick} className="upload-button">
                                                            <img src={imgURL} className="rounded-circle image-img" style={{ width: "100px" }} alt="Profile Logo" />
                                                            <i className="bi bi-camera" style={{position: 'absolute', top: '30px'}}></i>
                                                        </button>
                                                    }
                                                </UploadButton>
                                                <div className="ms-3 my-3 px-3">
                                                    <h5>{displayName}</h5>
                                                    <p className='user-name-text'>@{userName}</p>
                                                </div>
                                            </div>
                                            <div className="ms-auto">
                                                <DeleteButton/>
                                            </div>
                                        </CardSettingsInfo>
                                    </SettingsInfo>

                                    <SettingsInfo className="tab-pane fade settings-info-body" id="v-pills-security" role="tabpanel" aria-labelledby="v-pills-security-tab" tabIndex={0}>
                                        <CardSettingsInfo className="mt-3">
                                            <CardInputEditBody >
                                                <CardInput className="col" title={t("Settings.mail")} value={email} disabled={true} />
                                            </CardInputEditBody>
                                        </CardSettingsInfo>

                                        <CardSettingsInfo className="mt-3">
                                            <CardInputEditBody element={<SettingsButton className="sttings-edit-button" title={t("Settings.edit")} classNameIcon="bi bi-pencil" method={handalEditPassword} />}>
                                                <CardInput className="col" title={t("Settings.password")} value={"*********"} disabled={true} />
                                            </CardInputEditBody>
                                        </CardSettingsInfo>
                                    </SettingsInfo>

                                    <SettingsInfo className="tab-pane fade settings-info-body" id="v-pills-termsOfUse" role="tabpanel" aria-labelledby="v-pills-termsOfUse-tab" tabIndex={0}>
                                        {t("Settings.terms")}
                                    </SettingsInfo>

                                    <SettingsInfo className="tab-pane fade settings-info-body" id="v-pills-support" role="tabpanel" aria-labelledby="v-pills-support-tab" tabIndex={0}>
                                        <div className='text-center'>
                                            <h2>{t("Settings.help")}</h2>
                                            {t("Settings.q")}
                                            <br />
                                            <a href='mailto:scriptoria.work@gmail.com'>{t("Settings.sendEmail")}</a>
                                        </div>
                                    </SettingsInfo>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
