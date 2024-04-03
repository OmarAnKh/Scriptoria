import MemberCard from "./MemberCard.js";
import Waves from "../waves/Waves.js";

const MemberPage = () => {
    return (
        <div className="backgroundcolo">
            <div className="container text-center">
                <h1 className="mt-5">Our leadership team</h1>
                <div className="row justify-content-center mt-5">
                    <MemberCard
                        imageSrc="https://media.discordapp.net/attachments/882306256881221652/1225032721948999812/B09B7971-9FE6-4680-836A-399B71B62C35.jpg?ex=661fa7a0&is=660d32a0&hm=7e41c270b046293a8b4985634eed6c45e6af99df548a286e62acc7ede23d8eda&=&format=webp&width=541&height=676"
                        name="Omar Khalili"
                        role="Project Manager"
                        facebookLink="https://www.facebook.com/0marAnKh"
                        githubLink=""

                    />
                    <MemberCard
                        imageSrc="https://pbs.twimg.com/media/GIGE2r0WkAEW7Tz?format=jpg&name=large"
                        name="Abdelrahman Jbr"
                        role="Design Team Leader"
                        facebookLink="https://www.facebook.com/abooodjbr"
                        githubLink="https://github.com/AbooodJbr"
                        email="aboodasd321a@gmail.com"
                    />
                </div>
                <h1 className="mt-5">Designers &amp; Developers</h1>
                <div className="row justify-content-center mt-5">
                    <MemberCard
                        imageSrc="https://media.discordapp.net/attachments/1123724326110253117/1225080086919909406/me1.png?ex=661fd3bd&is=660d5ebd&hm=79e2a6ae4aa43a5ca36a6bac5e7eaece51045f5e7e1ea6c305f3e2090d52373d&=&format=webp&quality=lossless"
                        name="Ahmad iyrot"
                        role="Designer &amp; Developer"
                        facebookLink="https://www.facebook.com/profile.php?id=100080038279314"
                        githubLink="https://github.com/Ahmadiyrot"
                        email="Ahmadiyroot@gmail.com"
                    />
                    <MemberCard
                        imageSrc="https://media.discordapp.net/attachments/1101950978435055726/1225030553649287188/amjad.jpg?ex=661fa59b&is=660d309b&hm=242e87b8ac5e7b409ae22cb55507f7ef9b7734ee5b2232af407b2e0796684f8f&=&format=webp&width=685&height=676"
                        name="Amjad Awad"
                        role="Developer &amp; QA"
                        facebookLink="https://www.facebook.com/amjad.awad.94651"
                        githubLink="https://github.com/amjadAwad95"
                        email="amjadawad129@gmail.com"
                    />
                    <MemberCard
                        imageSrc="https://cdn.discordapp.com/attachments/1074411853125533806/1225100031623823470/WhatsApp_Image_2024-04-03_at_6.09.39_PM.jpeg?ex=661fe650&is=660d7150&hm=f4eb1891f6556938b5de1a2d2e2209df68d478c2ee15611e32c4b85a9f03cb05& "
                        name="Lama Shraim"
                        role="Designer &amp; Developer"
                        facebookLink="https://www.facebook.com/profile.php?id=100006064278505&mibextid=eQY6cl"
                        githubLink="https://github.com/lamaabbaker"
                        email="lamaabbaker@gmail.com"
                    />
                    <MemberCard
                        imageSrc="https://cdn.discordapp.com/attachments/1074411853125533806/1225098858732978307/WhatsApp_Image_2024-04-03_at_6.05.01_PM.jpeg?ex=661fe539&is=660d7039&hm=341904f2ffdf113eedc8db000561360a1dc503f7bbeb9cb9ce684ef7cb2f11d0& "
                        name="Areen Abudayeh"
                        role="Designer &amp; Developer"
                        facebookLink="https://www.facebook.com/profile.php?id=100016711962016"
                        githubLink="https://github.com/areenabudayeh"
                        email="areen.a.abodayeh@gmail.com"
                    />
                    <MemberCard
                        imageSrc="https://media.discordapp.net/attachments/1221546284712857780/1225070359892721704/431402166_3773083346346713_3276344665238324188_n.png?ex=661fcaae&is=660d55ae&hm=3352c38dd52f31cc033f130e2ea1126374613e607b1658596cad3474e662e99a&=&format=webp&quality=lossless&width=346&height=350"
                        name="Mohamad ali jbr"
                        role="1/2 Developer"
                        facebookLink="https://www.facebook.com/profile.php?id=100009352542889"
                        githubLink="https://www.github.com/mohammad-ali-jaber"
                        email="jaberaaa8@gmail.com"
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

    )
}
export default MemberPage;
