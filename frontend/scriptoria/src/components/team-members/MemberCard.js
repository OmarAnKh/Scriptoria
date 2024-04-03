
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
                    <ul className="social-link">
                        <li><a href={props.facebookLink} target="_blank" rel="noreferrer"><i className="bi bi-facebook h3 IconColor"></i></a></li>
                        <li><a href={props.githubLink} target="_blank" rel="noreferrer"><i className="bi bi-github h3 IconColor"></i></a></li>
                        <li><a href={props.email} target="_blank" rel="noreferrer"><i className="bi bi-envelope-at h3 IconColor"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default MemberCard;