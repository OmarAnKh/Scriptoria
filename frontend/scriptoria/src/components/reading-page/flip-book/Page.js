import React from 'react';

const Page = React.forwardRef((props, ref) => {
    return (
        <div key={props.key} className="demoPage" ref={ref} >
            <div>{props.children}</div>
            <p className='PageNumber'>{props.number}</p>
        </div>
    );
});

export default Page;