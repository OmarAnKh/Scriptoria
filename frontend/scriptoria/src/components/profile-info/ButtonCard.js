import React from 'react';

const ActionButton = (props) => {
    return (
        <button type="button" className={props.className} onClick={props.method}>
            {props.label}
            <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="currentColor" className={props.svgClassName} viewBox={props.viewBox}>
                <path d={props.path1} />
                <path d={props.path2} />
            </svg>
        </button>
    );
};

export default ActionButton;
