import './ShelfHeader.css'

const ShelfHeader = (props) => {
    return(
        <div className="d-flex justify-content-between my-3">
            <h1 className="fw-bold d-inline-block shelf-title">{props.title}</h1>
            <button type="button" className="btn btn-outline-primary view-button">{props.btnTitle}</button>
        </div>
    );
}

export default ShelfHeader;