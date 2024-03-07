const JoinInput = (props) => {
    const changeHandler = (event) => {
        props.method(event.target.value)
    }
    return (<div className="inputBox">
        <input type={props.type} required="" className="input-info" onChange={changeHandler} style={{ borderColor: props.color }} />             <span style={{ color: props.color }} >{props.title}</span>         </div>)
}

export default JoinInput