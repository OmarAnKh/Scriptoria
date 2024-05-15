import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const NavHomeButton = (props) => {
    const {auth} = useAuth()
    const cover = `data:image/png;base64,${auth?.userInfo?.profilePicture}`
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
            {
                props.pfp? <button type="button" className="btn p-0 rounded-5 m-2 border border-2 border-white" width="35" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src={cover} className="img-fluid object-fit-cover rounded-5" width="35"></img>
            </button> : <button type="button" className={`${props.buttonClassName}`} data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className={props.iclassName}></i>
            </button>
            }
            <div className="dropdown-menu dropdown-menu-end dropdown-menu-right">
                {
                    props.accountDropDown.map((accountInfo, idx) => {
                        return (
                            <Link className="dropdown-item fixthefit ShowArrowOnHover" to={accountInfo.to} key={idx} onClick={accountInfo.method}>
                                {accountInfo.title} <i className="bi bi-arrow-left-short ms-3"></i>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default NavHomeButton;