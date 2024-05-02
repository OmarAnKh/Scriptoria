import React, { useEffect } from 'react'
import './Registration.css'
import logo from "../../img/scriptoria-logo-white.png"
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom'

const Panel = ({ className, hText, infoText, btnClassName, btnId, btnText, onClick }) => {
    return (
        <div className={className}>
            <div className="content">
                <h3>{hText}</h3>
                <p>
                    {infoText}
                </p>
                <button className={btnClassName} id={btnId} onClick={onClick}>
                    {btnText}
                </button>
                <br></br>
                <img src={logo} alt="" className="img-registration " />
            </div>
        </div>
    )
}

const RegistrationForm = ({ children, panels, registrationMode }) => {
    const navigate = useNavigate()
    useEffect(() => {
        if (Cookies.get('flag')) {
            navigate('/')
        }
    }, []);
    return (
        <div className={`container-registration ${registrationMode ? 'registration-mode' : ''}`}>
            <div className="forms-container">
                <div className="registration-body">
                    {children}
                </div>
            </div>
            <div className={`panels-container ${registrationMode ? 'my-5' : ''}`}>
                {
                    panels.map((panel, idx) => {
                        return (
                            <React.Fragment key={idx}>
                                <Panel
                                    className={panel.className}
                                    hText={panel.hText}
                                    infoText={panel.infoText}
                                    btnClassName={panel.btnClassName}
                                    btnId={panel.btnId}
                                    onClick={panel.onClick}
                                    btnText={panel.btnText}
                                />
                            </React.Fragment>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default RegistrationForm