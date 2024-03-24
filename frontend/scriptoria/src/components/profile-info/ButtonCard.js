import React from 'react';

const ActionButton = ({ label, icon, additionalClasses, onClick }) => {
    return (
        <button type="button" className={`thebtn ${additionalClasses}`} onClick={onClick}>
            {label}
            {icon && (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className={icon.className} viewBox="0 0 16 16">
                    {icon.paths.map((path, index) => <path key={index} d={path} />)}
                </svg>
            )}
        </button>
    );
};

export default ActionButton;
