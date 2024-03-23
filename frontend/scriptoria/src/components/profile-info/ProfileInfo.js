import React from 'react';
import './ProfileInfo.css'
import InfoButton from './Card.js'
import ActionButton from './ButtonCard.js'
import { getAccountViaUserName } from "../../api/accountApi";
import { getAccountFollowers } from "../../api/accountApi.js"
import Cookies from 'js-cookie'
import { useState, useEffect } from 'react';

const Profile = () => {
    const [data, setData] = useState("");
    useEffect(() => {
        const handleResponse = async () => {
            let user = Cookies.get('userInfo');
            try {
                const res = await getAccountViaUserName("find/userName", user);
                setData(res);
                console.log(res);
            } catch (err) {
                console.log(err);
            }
        };
        handleResponse();
    }, []);
    return (
        <div className="MainPage row">
            <div className="Nda col">
                <div className="DisplayName">
                    Hello, I'm<br></br>{data.userName}
                    <div className="Username"> @{data.displayName}</div>
                </div>
                <br />
                <div className='container'>
                    <div className="AboutMe">
                        About Me
                        <div className="DescriptionArea ">
                            <p>
                                {data.description}
                            </p>
                        </div>
                    </div>
                </div>
                <br />
                <div className="buttons">
                    <ActionButton
                        label="Follow"
                        icon={{
                            className: "bi bi-person-add ms-3",
                            paths: [
                                "M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4",
                                "M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z"
                            ]
                        }}
                        additionalClasses="buttonstyle icon"
                    />
                    <ActionButton
                        label="Message"
                        icon={{
                            className: "bi bi-chat-right-text mt-2 ms-4",
                            paths: [
                                "M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z",
                                "M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5",
                            ]
                        }}
                        additionalClasses="buttonstyle"
                    />
                    <ActionButton
                        icon={{
                            className: "bi bi-three-dots-vertical",
                            paths: [
                                "M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
                            ]
                        }}
                        additionalClasses="threedots icon"
                    />
                </div>
            </div>
            <div className='col d-flex p-3 profileframe'>
                <div>
                    <div className="col-12 mb-3">
                        <div className="ImageFrame">
                            <img className="profileImage" src="https://media.discordapp.net/attachments/1123724326110253117/1219376530988466227/me1.png?ex=660b13e3&is=65f89ee3&hm=4d9766a586b35349996ef90f9602077be843e63df9d7aad1d3f2b9bfec04b3ce&=&format=webp&quality=lossless" />
                        </div>
                    </div>
                    <div className="">
                        <div className="buttons1">
                            <InfoButton text="Followers" value="356K" />
                            <InfoButton text="Works" value="21" />
                            <InfoButton text="Following" value="356" />
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <hr className='Divider' />
            <br />
        </div >
    );
};

export default Profile;