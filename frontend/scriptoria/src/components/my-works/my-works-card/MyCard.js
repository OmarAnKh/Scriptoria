
const MyCard = (props) => {
    return (
        <div className="custom-card-article">
            <img src={props.photo} alt="couldn't load" className="custom-card-img" />
            <div className="custom-card-data">
                <h2 className="custom-card-title">{props.storytitle}</h2>
                <a href="#" className="custom-card-button">Edit</a>
            </div>
        </div>
    )
}
export default MyCard