import React from 'react';

const TabItem = ({ isActive, children, onClick }) => {
    const activeClass = isActive ? 'active' : '';
    return (
        <li className="nav-item">
            <button className={`tab-item nav-link ${activeClass}`} onClick={onClick}>
                {children}
            </button>
        </li>
    );
};

export default TabItem;