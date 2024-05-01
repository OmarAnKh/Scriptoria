

const SettingsInfo = (props) => {
    return (
        <div className={props.className} id={props.id} role={props.role} aria-labelledby={props.ariaLabelledby} tabIndex={props.tabIndex}>
                {props.children}
        </div >
    );
}

export default SettingsInfo;