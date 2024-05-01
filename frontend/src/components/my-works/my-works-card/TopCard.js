
const TopCard = (props) => {
    return (
        <div className="TopCard">
            <h3>#{props.index}</h3>
            <img src={props.photo} alt="couldn't load" />
            <h5>{props.storytitle}</h5>

        </div>
    )
}
export default TopCard;