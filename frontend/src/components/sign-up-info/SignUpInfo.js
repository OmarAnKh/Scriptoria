import React, { useState } from 'react'
import RegistrationInput from '../registration/RegistrationInput'
import { genders, countrys } from './signUpOptions'
import RegistrationForm from '../registration/RegistrationForm'
import content from "../../img/content.png";
import openBook from "../../img/open-book.png";
import avatar from "../../img/avatar.png";
import profilePicture from "../../img/profilePicture.png";
import signature from "../../img/signature.png"
import { useLocation, useNavigate } from 'react-router-dom';
import useConvertPath from '../../hooks/useConvertPath';
import UploadImg from '../settings/UploadImg';
import { useTranslation } from 'react-i18next';
import './SignUpInfo.css'
import useThemeToggle from "../../hooks/useThemeToggle.js"

const JoyButton = (props) => {
    return (
        <>
            <button className="btn" onClick={(event) => {
                props.method(event, props.type)
            }}>
                <p>{props.title} {props.type === props.actives ? <i className="bi bi-check-circle-fill"></i> : <></>}</p>
                <img src={props.icon} className={`img-fluid`} style={{ width: "80px", height: "80px" }} alt="what do you prefer" />
            </button>
        </>
    );
}

const SignUpInfo = () => {
    const { t } = useTranslation();
    const [registrationMode, setRegistrationMode] = useState(false);
    const { convertPath } = useConvertPath()
    const toggleTheme = useThemeToggle();

    const location = useLocation();
    const navigate = useNavigate();
    const { accountInfo } = location.state || {};

    const [displayName, setDisplayName] = useState("");
    const [region, setRegion] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const [description, setDescription] = useState("")
    const [joyType, setJoyType] = useState("reader");

    const [displayNameError, setDisplayNameError] = useState("");
    const [regionError, setRegionError] = useState("");
    const [dateOfBirthError, setDateOfBirthError] = useState("");
    const [genderError, setGenderError] = useState("");

    const [image, setImage] = useState(profilePicture)
    const [addProfile, setAddProfile] = useState(false)

    const handleLeftCard = () => {
        if (displayName === "") {
            setDisplayNameError("DisplayName is required")
            setTimeout(() => {
                setDisplayNameError("")
            }, 2000)
            return
        }
        if (region === "" || region === "Select Your country") {
            setRegionError("Region is required")
            setTimeout(() => {
                setRegionError("")
            }, 2000)
            return
        }
        if (gender === "" || gender === "Select Your Gender") {
            setGenderError("Gender is required")
            setTimeout(() => {
                setGenderError("")
            }, 2000)
            return
        }
        if (dateOfBirth === "") {
            setDateOfBirthError("dateOfBirth is required")
            setTimeout(() => {
                setDateOfBirthError("")
            }, 2000)
            return
        }
        accountInfo.displayName = displayName;
        accountInfo.region = region;
        accountInfo.dateOfBirth = dateOfBirth;
        accountInfo.gender = gender;
        setRegistrationMode(true);
    };

    const handleRightCard = () => {
        setRegistrationMode(false);
    };

    const handleJoyButton = (event, type) => {
        event.preventDefault();
        setJoyType(type)
    }

    const handleProfileButton = (event, type) => {
        event.preventDefault();
        if (type === 'Avatar') {
            handleSignUpInformation(event, type)
        }
    }

    const handleSignUpInformation = async (event, type) => {
        event.preventDefault();
        if (description !== "") {
            accountInfo.description = description;
        }
        accountInfo.type = joyType;

        if (joyType === "both") {
            accountInfo.profilePicture = content;
        }
        if (joyType === "reader") {
            accountInfo.profilePicture = await convertPath(openBook);
        }
        if (joyType === "writer") {
            accountInfo.profilePicture = await convertPath(signature);
        }

        if (addProfile) {
            accountInfo.profilePicture = image
        }

        if (type === "Avatar") {
            return navigate(`/Avatars`, { state: { accountInfo } });
        }
        navigate(`/SignUpVerificationCode`, { state: { accountInfo } });
    }

    const panelsData = [
        {
            className: "panel left-panel",
            hText: t("Registration.panel_htext_two"),
            infoText: t("Registration.panel_info_text_two"),
            btnClassName: "btn-registration",
            btnId: "sign-up-btn",
            onClick: handleLeftCard,
            btnText: t("Registration.panel_continue")
        },
        {
            className: "panel right-panel",
            hText: t("Registration.panel_htext"),
            infoText: t("Registration.panel_info_text_two"),
            btnClassName: "btn-registration",
            btnId: "sign-in-btn",
            onClick: handleRightCard,
            btnText: t("Registration.panel_back")
        }
    ];
    return (
        <RegistrationForm panels={panelsData} registrationMode={registrationMode}>
            <form className="left-registration-card" onSubmit={(event) => { event.preventDefault() }}>
                <h2 className="title">{t("Registration.sign_up_infromation_title")}</h2>
                <RegistrationInput className="input-field" iClassName="bx bx-envelope" inputClassName={"px-3"} type="text" placeholder={t("Registration.displayName")} error={displayNameError} onChange={setDisplayName} />
                <RegistrationInput className="input-field" options={countrys} value={region} error={regionError} onChange={setRegion} />
                <RegistrationInput className="input-field" options={genders} value={gender} error={genderError} onChange={setGender} />
                <RegistrationInput className="input-field d-flex justify-content-center" inputClassName="text-center" type="date" placeholder="dd-mm-yyyy" error={dateOfBirthError} onChange={setDateOfBirth} />
            </form>
            <form className="right-registration-card" onSubmit={(event) => { event.preventDefault() }}>
                <h2 className="title sign-up-info-title">{t("Registration.sign_up_infromation_title")}</h2>
                <RegistrationInput className="col-md-8 user-description" inputClassName="form-control" type="textarea" placeholder={t("Registration.description")} onChange={setDescription} />
                <div className='row d-flex justify-content-center signup-joy-buttons '>
                    <div className='d-flex justify-content-between mx-4'>
                        <JoyButton icon={openBook} type={"reader"} title={t("Registration.reader")} actives={joyType} method={(event, type) => {
                            handleJoyButton(event, type)
                        }} />
                        <JoyButton icon={content} type={"both"} title={t("Registration.both")} actives={joyType} method={(event, type) => {
                            handleJoyButton(event, type)
                        }} />
                        <JoyButton icon={signature} type={"writer"} title={t("Registration.writer")} actives={joyType} method={(event, type) => {
                            handleJoyButton(event, type)
                        }} />
                    </div>
                </div>
                <div className="row d-flex text-center" style={{ marginTop: '1em' }}>
                    <p className="">{t("Registration.image_type")}</p>
                    <div className="avatar-profile d-flex justify-content-center">
                        <div className='mx-4'>
                            <UploadImg imgURL={image} setImgURL={setImage} width={80} setAddProfile={setAddProfile} />
                            <p>{t("Registration.profile_picture")}</p>
                        </div>
                        <button className="btn" onClick={(event) => {
                            handleProfileButton(event, "Avatar")
                        }}>
                            <img src={avatar} className="img-fluid rounded-circle image-img" style={{ width: "80px", height: "80px" }} alt="what do you prefer" />
                            <p>{t("Registration.avatar")}</p>
                        </button>
                    </div>
                </div>
                <button type="submit" className="btn-registration solid mb-5" onClick={(event) => { handleSignUpInformation(event) }} >{t("Registration.signup_btn_text")}</button>
            </form>
        </RegistrationForm>
    )
}

export default SignUpInfo