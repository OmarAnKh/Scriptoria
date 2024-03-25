import { Link } from "react-router-dom";

const NavHomeButton = (props) => {
    if (!props.isDropDown) {
        return (
            <div className={props.className}>
                {props.children}
                <button className={props.buttonClassName}><i className={props.iclassName} onClick={props.method}></i></button>
            </div>
        )
    }
    return (
        <div className={props.className}>
            <button type="button" className={props.buttonClassName} data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className={props.iclassName}></i>
            </button>
            <div className="dropdown-menu dropdown-menu-end dropdown-menu-right">
                {
                    props.accountDropDown.map((accountInfo, idx) => {
                        return (
                            <Link className="dropdown-item" to={accountInfo.to} key={idx} onClick={accountInfo.method}>
                                {accountInfo.title}
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default NavHomeButton;