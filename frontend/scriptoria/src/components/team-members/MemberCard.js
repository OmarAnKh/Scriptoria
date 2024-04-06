
import './MemberCard.css';
const MemberCard = (props) => {
    return (
        <div className="col-sm-6 col-md-3">
            <div className="profile-card">
                <div className="profile-img">
                    <img src={props.imageSrc} alt="Coludnt load." />
                </div>
                <div className="profile-content">
                    <h2 className="title">{props.name}
                        <span>{props.role}</span>
                    </h2>
                    <div className="social-link">
                        <a href={props.facebookLink} target="_blank" rel="noreferrer"><i className="bi bi-facebook h3 IconColor"></i></a>
                        <a href={props.githubLink} target="_blank" rel="noreferrer"><i className="bi bi-github h3 IconColor"></i></a>
                        <a href={`mailto:${props.email}`} target="_blank" rel="noreferrer"><i className="bi bi-envelope-at h3 IconColor"></i></a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MemberCard;