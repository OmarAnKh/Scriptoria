import { useEffect, useState } from 'react';
import { createAvatar } from '@dicebear/core';
import './Avatar.css'

const Avatar = ({ name, options, sentData }) => {

    const [selectedOptions, setSelectedOptions] = useState({});
    const [optionsAndValues, setOptionsAndValues] = useState({});
    const [activeButton, setActiveButton] = useState(null);
    const [activeChoice, setActiveChoice] = useState(null)

    useEffect(() => {
        const temp = {};
        Object.keys(options).forEach((option) => {
            if (Array.isArray(options[option].default) && options[option].default.length > 1 && options[option].items.type !== 'integer') {
                
                if (options.hasOwnProperty(`${option}Probability`)) {
                    temp[option] = { options: options[option].default, probability: true };
                    if (!temp[option].options.includes('')) {
                        temp[option].options.unshift('')
                    }
                } else {
                    temp[option] = { options: options[option].default, probability: false };
                }
            }
        });

        setOptionsAndValues(temp);
        setSelectedOptions({});
    }, [name]);

    const handleClick = (option, value, probability, idx) => {
        
        setActiveChoice(idx)

        setSelectedOptions(prevOptions => ({
            ...prevOptions,
            [option]: [value],
            ...(probability ? { [`${option}Probability`]: [100] } : {})
        }));
    };

    useEffect(() => {
        
        const data = selectedOptions;
        sentData(data);
    }, [selectedOptions]);

    const handleButtonClick = (option) => {
        setActiveButton(option === activeButton ? null : option); 
    };


    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 optionsNavBar">
                        {Object.keys(optionsAndValues)?.map((option, index) => (
                            <li className="nav-item" key={index}>
                                <a
                                    className={`nav-link ${option === activeButton ? 'active' : ''}`}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleButtonClick(option)}
                                >
                                    {option}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>

            {Object.keys(optionsAndValues).length > 0 ? (
                Object.keys(optionsAndValues)?.map((option, index) => (
                    <div className={`${option} collapse`} key={index} id={`${option}collapseExample`} style={{ display: activeButton === option ? 'block' : 'none' }}>
                        <div className="avatar-grid">
                            {Array.isArray(optionsAndValues[option].options) && optionsAndValues[option].options.map((value, idx) => {

                                const avatar = createAvatar(name, {
                                    ...(optionsAndValues[option].probability ? { [`${option}Probability`]: [100] } : {}),
                                    ...selectedOptions,
                                    [option]: [`${value}`],
                                });

                                return (
                                    <img 
                                        key={idx} 
                                        className='style-img'
                                        src={avatar.toDataUriSync()} 
                                        alt="Avatar" 
                                        onClick={() => handleClick(option, value, optionsAndValues[option].probability, `${idx}${option}`)}
                                        style={{border: activeChoice === `${idx}${option}` ? '6px outset #AC967F' : ''}}
                                    />
                                );
                            })}
                        </div>
                    </div>
                ))
            ) : (
                <div>No available options </div>
            )}
        </>
    );
};

export default Avatar;