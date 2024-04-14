import "./Footer.css"
import SupportImg from "../../img/ContactUs.png"

import React from "react";
import { useTranslation } from 'react-i18next';

const Footer = () => {
    // const { t } = useTranslation()
    return (
        <footer>
            {/* <div className="container-fluid d-flex justify-content-end footerimg">
                <div className="row">
                    

                    <div className="col justf">
                        
                    </div>
                </div>
            </div> 

            <div className="copyright">
                
            </div>
*/}




            <div class="container">
                <div class="row pt-5">
                    <div class="col firstCol">
                        <div className="SupportText">
                            <h1 className="NeedHelpText">Need help?! Reach out!</h1>
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="d-flex">
                                        <div className="icon px-3 pt-5 pb-5"><i className="bi bi-youtube h1"></i></div>
                                        <div className="icon px-3 pt-5 pb-5"><i className="bi bi-facebook h1"></i></div>
                                        <div className="icon px-3 pt-5 pb-5"><i className="bi bi-twitter-x h1"></i></div>
                                        <div className="icon px-3 pt-5 pb-5"><i className="bi bi-envelope-at h1"></i></div>
                                        <div className="icon px-3 pt-5 pb-5"><i className="bi bi-instagram h1"></i></div>

                                    </div>
                                    <div className="fitcon">For business inquiries, please reach out to us via email.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <img src={SupportImg} alt="SupportImg" className="SupportImg" />
                    </div>
                    <div className="row footerplace">
                        <div>©Scriptoria 2024 </div>
                    </div>
                </div>
            </div>
        </footer >

    );
}

export default Footer;