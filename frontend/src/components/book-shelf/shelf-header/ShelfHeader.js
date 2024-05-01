import './ShelfHeader.css'
import { Link } from 'react-router-dom';

const ShelfHeader = (props) => {
    return (
        <div className="d-flex justify-content-between my-3">
            <span className="fw-bold d-inline-block shelf-title">{props.title}</span>
            {props.state ? <Link to={props.link} type="button" className="btn btn-outline-primary view-button">{props.btnTitle}</Link> : <></>}
        </div>
    );
}

export default ShelfHeader;