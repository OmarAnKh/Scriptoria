import "./Footer.css"
import SupportImg from "../../img/ContactUs.png"

import React from "react";
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation()
    return (
        <>
            <svg className="WaveTopStyle img-fluid flipitupside" width="1440" height="88" viewBox="0 0 1440 88" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 88L12 87.2C24 86.3 48 84.7 72 80.7C96 76.7 120 70.3 144 66.7C168 63 192 62 216 62.3C240 62.7 264 64.3 288 66C312 67.7 336 69.3 360 67.5C384 65.7 408 60.3 432 57.8C456 55.3 480 55.7 504 56.3C528 57 552 58 576 59.2C600 60.3 624 61.7 648 62.3C672 63 696 63 720 61.2C744 59.3 768 55.7 792 55.2C816 54.7 840 57.3 864 63.2C888 69 912 78 936 76.7C960 75.3 984 63.7 1008 63.3C1032 63 1056 74 1080 76.3C1104 78.7 1128 72.3 1152 72.8C1176 73.3 1200 80.7 1224 79.8C1248 79 1272 70 1296 64.7C1320 59.3 1344 57.7 1368 60.5C1392 63.3 1416 70.7 1428 74.3L1440 78V0H1428C1416 0 1392 0 1368 0C1344 0 1320 0 1296 0C1272 0 1248 0 1224 0C1200 0 1176 0 1152 0C1128 0 1104 0 1080 0C1056 0 1032 0 1008 0C984 0 960 0 936 0C912 0 888 0 864 0C840 0 816 0 792 0C768 0 744 0 720 0C696 0 672 0 648 0C624 0 600 0 576 0C552 0 528 0 504 0C480 0 456 0 432 0C408 0 384 0 360 0C336 0 312 0 288 0C264 0 240 0 216 0C192 0 168 0 144 0C120 0 96 0 72 0C48 0 24 0 12 0H0V88Z" />
            </svg>
            <footer>
                <div className="container">
                    <div className="row pt-5">
                        <div className="col firstCol">
                            <div className="SupportText">
                                <h1 className="NeedHelpText">{t("Footer.need-help-reach-out")}</h1>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="d-flex iconsrow justify-content-center">
                                            <div className="icon px-3 pt-5 pb-5"><i className="bi bi-youtube h1"></i></div>
                                            <div className="icon px-3 pt-5 pb-5"><i className="bi bi-facebook h1"></i></div>
                                            <div className="icon px-3 pt-5 pb-5"><i className="bi bi-twitter-x h1"></i></div>
                                            <div className="icon px-3 pt-5 pb-5"><i className="bi bi-envelope-at h1"></i></div>
                                            <div className="icon px-3 pt-5 pb-5"><i className="bi bi-instagram h1"></i></div>
                                        </div>
                                        <div className="fitcon">{t("Footer.reach-out-via-email")}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col SupportImgDiv">
                            <img src={SupportImg} alt="SupportImg" className="SupportImg" />
                        </div>
                    </div>

                </div>
                <div className="footerplace">
                    <div>© Scriptoria 2024 </div>
                </div>
            </footer >
        </>
    );
}

export default Footer;