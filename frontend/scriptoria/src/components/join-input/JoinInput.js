

const JoinInput = (props) => {
    return (
        <div className="inputBox">
            <input type="text" required="" className="input-info" />
            <span >{props.title}</span>
        </div>
    )
}

export default JoinInput