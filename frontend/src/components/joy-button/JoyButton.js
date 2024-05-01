import "./JoyButton.css"

const JoyButton = (props) => {
    return (
        <>
            <button className="btn" onClick={() => {
                props.method(props.type)
            }}>
                <img src={props.icon} className="img-fluid joy-img" alt="what do you prefer" />
            </button>
        </>
    );
}

export default JoyButton