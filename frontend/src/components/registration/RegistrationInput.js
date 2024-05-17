import React, { useState } from 'react'

const RegistrationInput = ({ className, iClassName, type, placeholder, error, options, value, onChange, inputClassName }) => {
    const [inputType, setInputType] = useState(type)
    const handleShowPassword = () => {
        if (inputType === "password") {
            setInputType("text")
            return
        }
        setInputType("password")
    }
    if (!options) {
        return (
            <>
                <div className={className}>
                    <i className={iClassName} />
                    {type !== "textarea" ?
                        <input className={inputClassName} style={{ width: "100%" }} type={inputType} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
                        : <textarea className={inputClassName} rows={5} placeholder={placeholder} onChange={(event) => onChange(event.target.value)}></textarea>}
                    {type === "password" ? <i className="bi bi-eye registration-see-password" onClick={handleShowPassword}></i> : <></>}
                </div>
                <p className='registration-input-error'>{error}</p>
            </>
        )
    }
    return (
        <>
            <div className={className}>
                <select className="form-control" style={{ backgroundColor: 'transparent', border: "none" }} onChange={(event) => onChange(event.target.value)} >
                    {options.map(option => {
                        return (
                            <option value={option} key={option} > {option}</option>
                        );
                    })}
                </select>
            </div>
            <p className='story-details-error'>{error}</p>
        </>
    )
}

export default RegistrationInput