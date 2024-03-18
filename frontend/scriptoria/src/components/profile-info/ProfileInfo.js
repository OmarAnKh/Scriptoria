import React from 'react';
import './ProfileInfo.css'

const Profile = () => {
    return (
        <div className="MainPage container-fluid ">
            <div className="Nda">
                <div className="DisplayName">
                    Hello, I'm<br></br>Ahmad iyrot
                    <div className="Username"> @Ahmadiyro</div>
                </div>
                <br />
                <div className="AboutMe">
                    About Me
                    <div className="DescriptionArea">
                        <p>
                            I am a hard-working and driven individual who isn’t afraid to face a
                            challenge. I’m passionate about my work and I know how to get the job
                            done. I would describe myself as an open and honest person who doesn’t
                            believe in misleading other people and tries to be fair in everything
                            I do. Well, I’m very knowledgeable in my field. I worked in IT for
                            over 2 years before transitioning into more managerial roles. Thanks
                            to my years of experience, I’m very meticulous in my work. I also like
                            to keep things very professional. I’m very direct in all of my
                            communications, but I’m also careful not to hurt anyone’s feelings.
                            I’ve worked as a systems analyst since I graduated from college. I am
                            very particular about the details of my work, but I also like to stay
                            open-minded to new ideas. I never want to close myself off to other
                            people’s opinions.
                        </p>
                    </div>
                </div>
                <br />
                <div className="buttons">
                    <button type="button" className="thebtn buttonstyle icon">
                        Follow
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-add ms-3" viewBox="0 0 16 16">
                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                            <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                        </svg>
                    </button>
                    <button type="button" className="thebtn buttonstyle">
                        Message
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chat-right-text mt-2 ms-4" viewBox="0 0 16 16">
                            <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z" />
                            <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                        </svg>
                    </button>
                    <button type="button" className="thebtn threedots icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical " viewBox="0 0 16 16">
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
