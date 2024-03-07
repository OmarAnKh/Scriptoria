import "./JoyButton.css"

const JoyButton = (props) => {
    return (
        <>
            <button className="btn">
                <img src={props.icon} className="img-fluid joy-img" />
            </button>
        </>
    );
}

export default JoyButton