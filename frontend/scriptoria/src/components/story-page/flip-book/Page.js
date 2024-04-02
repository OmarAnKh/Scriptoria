import React from 'react';

const Page = React.forwardRef((props, ref) => {
    return (
        <div className="demoPage" ref={ref}>
            <p>{props.children}</p>
            <p className='PageNumber'>{props.number}</p>
        </div>
    );
});

export default Page;