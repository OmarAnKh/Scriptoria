import * as dicebear from '@dicebear/collection';
import availableStyles from './AvailableStyles';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Character from './Character';
import Avatar from './avatar/Avatar';
import Styles from './styles/Styles';
import './AvatarPage.css'
import { Tooltip } from 'react-tooltip';

const AvatarPage = () => {

    const { t } = useTranslation()

    const [clickedStyle, setClickedStyle] = useState(dicebear.adventurer);
    const [clickedStyleName, setClickedStyleName] = useState("adventurer");
    const [clickedStyleOptions, setClickedStyleOptions] = useState(dicebear.adventurer.schema.properties);
    const [receivedOptions, setReceivedOptions] = useState({});
    const [isNavBarVisible, setIsNavBarVisible] = useState(false);
    const [activeTab, setActiveTab] = useState("styles");
    const [save, setSave] = useState(false)
    const [cancel, setCancel] = useState(false)
    
    const receiveOptions = (data) => {
        setReceivedOptions(data);
    };

    const toggleNavBar = () => {
        setIsNavBarVisible(!isNavBarVisible);
    };

    const getRandomAvatar = () => {
        
        const randomSeeds = availableStyles[clickedStyleName].randomSeeds
        const randomIndex = Math.floor(Math.random() * randomSeeds.length);
        setReceivedOptions({seed: [`${randomSeeds[randomIndex]}`]})
    }

    useEffect(() => {
        setReceivedOptions({})
    }, [clickedStyle])

    return (
        <div  style={{backgroundColor: availableStyles[clickedStyleName].color,}} >
            <div className="container py-3">
                <div className="row">
                    <div className="col-md-6 order-md-2">
                        <div className="d-flex justify-content-end">
                            <button className="btn-save-random mx-2" onClick={() => setSave(!save)}>
                                <span className="avtar-save-text">{t("AvatarPage.save")}</span>
                            </button>
                            <button className="btn-save-random mx-2" onClick={() => setCancel(true)}>
                                <span className="avtar-save-text">{t("AvatarPage.cancel")}</span>
                            </button>
                        </div>
                    </div>
                    <div className="col-md-6 order-md-1">
                        <div className="d-flex justify-content-start">
                            <button className="btn-save-random" onClick={() => getRandomAvatar()} data-tooltip-id="random-avatar" data-tooltip-content='Get random avatar' data-tooltip-place='bottom'>
                                <svg height="24" width="24" fill="#FFFFFF" viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" className="sparkle">
                                    <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
                                </svg>
                            </button>
                            <Tooltip id="random-avatar" />
                        </div>
                    </div>
                </div>
                <div className="mt-5 d-flex justify-content-center align-items-center">
                    <Character style={clickedStyle} options={receivedOptions} name={clickedStyleName} save={save} cancel={cancel} setSave={setSave}/>
                </div>
                <div className="container mt-5">
                    <div className=" mt-3 w-55">
                        <div className=" d-flex justify-content-center">
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button style={{ margin: '0 5px' }} className={`button-styles-Options ${activeTab === 'styles' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('styles')}>{t("AvatarPage.avatar_styles")}</button>
                                <button style={{ margin: '0 5px' }} className={`button-styles-Options ${activeTab === 'avatar' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('avatar')}>{t("AvatarPage.styling_options")}</button>
                            </div>
                        </div>
                        {activeTab === 'styles' && (
                            <div className="card  Card-styles-Options mt-3 w-55">
                                <div className="card-body ">
                                    <Styles setClickedStyle={setClickedStyle} setClickedStyleName={setClickedStyleName} setClickedStyleOptions={setClickedStyleOptions} />
                                </div>
                            </div>
                        )}
                        {activeTab === 'avatar' && (
                            <div className="card Card-styles-Options mt-3 w-55" style={{height: '400px'}}>
                                <div className="card-body ">
                                    <Avatar name={clickedStyle} options={clickedStyleOptions} sentData={receiveOptions} onClick={toggleNavBar} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default AvatarPage;