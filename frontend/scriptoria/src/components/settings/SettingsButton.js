
const SettingsButton = (props) => {
    return (
        <button className={props.className}
            id={props.id}
            data-bs-toggle={props.dataBsToggle}
            data-bs-target={props.dataBsTarget}
            type={props.type}
            role={props.role}
            aria-controls={props.ariaControls}
            aria-selected={props.ariaSelected}
            disabled={props.disabled}
            onClick={props.method}>
            <i className={`${props.classNameIcon} mx-2`}></i>
            <span className="link-settings-button">{props.title}</span>
        </button>
    );
}

export default SettingsButton;