import MemberCard from "./MemberCard.js";
import Waves from "../waves/Waves.js";
import Navbar from "../navbar/Navbar.js";
import omar from "./team-members-img/omar.jpg"
import abood from "./team-members-img/abood.jpg"
import amjad from "./team-members-img/amjad.jpg"
import areen from "./team-members-img/areen.jpg"
import lama from "./team-members-img/lama.jpg"
import mohammad from "./team-members-img/mohammad.jpg"
import ahmad from "./team-members-img/ahmad.jpg"
const MemberPage = () => {
    return (
        <>
            <Navbar />
            <div className="backgroundcolo">
                <div className="container text-center">
                    <h1 className="mt-5">Our leadership team</h1>
                    <div className="row justify-content-center mt-5">
                        <MemberCard
                            imageSrc={omar}
                            name="Omar Khalili"
                            role="Project Manager"
                            facebookLink="https://www.facebook.com/0marAnKh"
                            githubLink="https://github.com/OmarAnKh"
                            email="omarkhalili810@gmail.com"
                            discordId="545313121208893445"
                        />
                        <MemberCard
                            imageSrc={abood}
                            name="Abood Jbr"
                            role="Design Team Leader"
                            facebookLink="https://www.facebook.com/abooodjbr"
                            githubLink="https://github.com/AbooodJbr"
                            email="aboodasd321a@gmail.com"
                            discordId="1071373404797681674"
                        />
                    </div>
                    <h1 className="mt-5">Designers &amp; Developers</h1>
                    <div className="row justify-content-center mt-5">
                        <MemberCard
                            imageSrc={ahmad}
                            name="Ahmad iyrot"
                            role="Designer &amp; Developer"
                            facebookLink="https://www.facebook.com/profile.php?id=100080038279314"
                            githubLink="https://github.com/Ahmadiyrot"
                            email="Ahmadiyroot@gmail.com"
                            discordId="833407979034247189"
                        />
                        <MemberCard
                            imageSrc={areen}
                            name="Areen Abudayeh"
                            role="Designer &amp; Developer"
                            facebookLink="https://www.facebook.com/profile.php?id=100016711962016"
                            githubLink="https://github.com/areenabudayeh"
                            email="areen.a.abodayeh@gmail.com"
                            discordId="1068112091040464906"
                        />
                        <MemberCard
                            imageSrc={amjad}
                            name="Amjad Awad"
                            role="Developer &amp; QA"
                            facebookLink="https://www.facebook.com/amjad.awad.94651"
                            githubLink="https://github.com/amjadAwad95"
                            email="amjadawad129@gmail.com"
                            discordId="1064908951906435082"
                        />
                        <MemberCard
                            imageSrc={lama}
                            name="Lama Shraim"
                            role="Designer &amp; Developer"
                            facebookLink="https://www.facebook.com/profile.php?id=100006064278505&mibextid=eQY6cl"
                            githubLink="https://github.com/lamaabbaker"
                            email="lamaabbaker@gmail.com"
                            discordId="1068186886323052624"
                        />

                        <MemberCard
                            imageSrc={mohammad}
                            name="Mohamad ali jbr"
                            role="Developer"
                            facebookLink="https://www.facebook.com/profile.php?id=100009352542889"
                            githubLink="https://www.github.com/mohammad-ali-jaber"
                            email="jaberaaa8@gmail.com"
                            discordId="1111015215782445110"
                        />
                    </div>

                </div>
                <Waves
                    color1="rgba(255,255,255,0.7"
                    color2="rgba(255,255,255,0.5)"
                    color3="rgba(255,255,255,0.3)"
                    baseColor="#fff"
                />
            </div>
        </>
    )
}
export default MemberPage;
