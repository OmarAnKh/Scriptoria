
const Button = (props) => {
    return (
        <button className="thebtn1 buttonstyle d-flex flex-column">
            <p className={'${props.name} mb-0'}>{props.text}</p>
            <p className={'${props.name} mb-0'}>{props.value}</p>
        </button>
    )
}

export default Button