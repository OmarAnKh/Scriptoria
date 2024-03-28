import React, { useState } from 'react';
import "./Settings.css";
import SettingsButton from "./SettingsButton";
import SettingsInfo from "./SettingsInfo";
import logo from "../../img/content.png";

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
        title: "User Info",
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
        title: "Privacy",
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
        title: "Security",
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
        title: "Terms Of Use",
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
        title: "Support",
        classNameIcon: "bi bi-headset"
    }
];

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
                <input className="form-control settings-card-input" value={props.value} disabled={props.disabled} />
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
    const [inputDisabled, setInputDisabled] = useState(true);
    const [textareaDisabled, setTextareaDisabled] = useState(true);

    const handelInputDisabled = () => {
        setInputDisabled(!inputDisabled);
    }

    const handelTextareaDisabled = () => {
        setTextareaDisabled(!textareaDisabled);
    }

    return (
        <div className="settings-page-top-body">
            <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <div className="settings-page-header py-4">
                            <span className="edit-profile-text">Edit profile</span>
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
                                                <img src={logo} className="rounded-circle image-img" style={{ width: "150px" }} alt="Profile Logo" />
                                                <i className="bi bi-camera image-icon"></i>
                                                <div className="ms-3 my-3">
                                                    <h5>Amjad awad</h5>
                                                    <p className='user-name-text'>@AmjadAwad</p>
                                                </div>
                                            </div>
                                        </CardSettingsInfo>

                                        <CardSettingsInfo className="mt-3">
                                            <CardInputEditBody title="User Information" element={<SettingsButton className="sttings-edit-button" title="Edit" classNameIcon="bi bi-pencil" method={handelInputDisabled} />}>
                                                <CardInput className="col" title="User Name" value="amjad" disabled={inputDisabled} />
                                                <CardInput className="col" title="Disblay Name" value="amjad awad" disabled={inputDisabled} />
                                                <div className="w-100 my-3" />
                                                <CardInput className="col" title="Gender" value="male" disabled={inputDisabled} />
                                                <CardInput className="col" title="Region" value="palestine" disabled={inputDisabled} />
                                            </CardInputEditBody>
                                        </CardSettingsInfo>

                                        <CardSettingsInfo className="mt-3">
                                            <CardInputEditBody title="Description" element={<SettingsButton className="sttings-edit-button" title="Edit" classNameIcon="bi bi-pencil" method={handelTextareaDisabled} />}>
                                                <textarea
                                                    rows={20}
                                                    cols={70}
                                                    placeholder="Enter your description here..."
                                                    disabled={textareaDisabled}
                                                />
                                            </CardInputEditBody>
                                        </CardSettingsInfo>
                                    </SettingsInfo>

                                    <SettingsInfo className="tab-pane fade settings-info-body" id="v-pills-privacy" role="tabpanel" aria-labelledby="v-pills-privacy-tab" tabIndex={0}>
                                        <div className="card">
                                            <div className="card-body">
                                                <img src={logo} className="rounded-circle" style={{ width: "150px" }} alt="Profile Logo" />
                                            </div>
                                        </div>
                                        <div className="card mt-3">
                                            <div className="card-body">
                                                This is some text within a card body.
                                            </div>
                                        </div>
                                    </SettingsInfo>

                                    <SettingsInfo className="tab-pane fade settings-info-body" id="v-pills-security" role="tabpanel" aria-labelledby="v-pills-security-tab" tabIndex={0}>
                                        Security content
                                    </SettingsInfo>

                                    <SettingsInfo className="tab-pane fade settings-info-body" id="v-pills-termsOfUse" role="tabpanel" aria-labelledby="v-pills-termsOfUse-tab" tabIndex={0}>
                                        Terms of Use content
                                    </SettingsInfo>

                                    <SettingsInfo className="tab-pane fade settings-info-body" id="v-pills-support" role="tabpanel" aria-labelledby="v-pills-support-tab" tabIndex={0}>
                                        Support content
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
