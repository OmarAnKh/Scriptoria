import { createAvatar } from '@dicebear/core'
import availableStyles from '../AvailableStyles'
import './Styles.css'
import { useState } from 'react'


const Styles = ({setClickedStyle, setClickedStyleName, setClickedStyleOptions}) => {

    const [activeChoice, setActiveChoice] = useState(null)

    const styleHandler = (selectedStyle, idx) => {

        setClickedStyle(availableStyles[selectedStyle].style)
        setClickedStyleName(availableStyles[selectedStyle].styleName)
        setClickedStyleOptions(availableStyles[selectedStyle].options)
        setActiveChoice(idx)
    }

    return(
        <>
            <div className='avatar-styles'>
                <div className="stayle-grid">
                    {Object.keys(availableStyles)?.map((availableStyle, idx) => {

                                const avatar = createAvatar(availableStyles[availableStyle].style, {});
                                return (
                                    <img
                                        src={avatar.toDataUriSync()}
                                        alt={availableStyles[availableStyle].styleName}
                                        key={idx}
                                        className='avatar-style-img'
                                        onClick={() => styleHandler(availableStyle, idx)}
                                        style={{border: activeChoice === idx ? '6px outset #AC967F' : ''}}
                                        />
                                )
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default Styles;