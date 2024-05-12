import React from 'react';
import { Link } from 'react-router-dom';

const AuthButtons = (props) => {
    return (

        <Link type='button' className="sginbutton text-wrap" to={props.to}>
            {props.title}
        </Link>

    );
}

export default AuthButtons;
