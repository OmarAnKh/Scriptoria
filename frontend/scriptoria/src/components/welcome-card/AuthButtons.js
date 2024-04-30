import React from 'react';

const AuthButtons = (props) => {
    return (
        
            <a type='button' className="sginbutton" href={props.herf}>
                {props.title}
            </a>
        
    );
}

export default AuthButtons;
