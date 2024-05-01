import React from 'react';
import './Waves.css'
const WavesSVG = (props) => {
    return (
        <div>
            <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                <defs>
                    <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g className="parallax">
                    <use xlinkHref="#gentle-wave" x="48" y="0" fill={props.color1} />
                    <use xlinkHref="#gentle-wave" x="48" y="3" fill={props.color2}  />
                    <use xlinkHref="#gentle-wave" x="48" y="5" fill={props.color3}  />
                    <use xlinkHref="#gentle-wave" x="48" y="7" fill={props.baseColor}  />
                </g>
            </svg>
        </div>
    );
};

export default WavesSVG;
