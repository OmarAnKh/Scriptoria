import { Link } from "react-router-dom";

const FooterLink = (props) => (
    <li className="footer-link-item">
        <h6><span className="Scriptoria ourbtn fs-2 py-0 px-0">{props.title}</span></h6>
        <Link className="footer-item" to={props.firstLink}>{props.firstLinkName}</Link>
        <Link className="footer-item" to={props.secoundLink}>{props.secoundLinkName}</Link>
    </li>
);

export default FooterLink;