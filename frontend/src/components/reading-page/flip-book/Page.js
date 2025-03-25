import React from 'react';

const BookPage = React.forwardRef((props, ref) => {
    return (
        <div key={props.key} className="demoPage container-fluid" ref={ref} >
            <div>{props.children}</div>
            <p className='PageNumber'>{props.number}</p>
        </div>
    );
});

export default BookPage;