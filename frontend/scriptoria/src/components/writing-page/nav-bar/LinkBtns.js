import React from 'react'
import { Link } from "react-router-dom";

const LinkBtns = ({btnCN, icon, badge, badgeMsg}) => {
  return (
    <Link
                type="button"
                className= {`${btnCN} btn btn-outline-dark rounded-circle position-relative`}
              >
                <i className={icon}></i>
                {badge===0 ? '' : <span className="position-absolute p-1 top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {badge}
                  <span className="visually-hidden">{badgeMsg}</span>
                </span>}
    </Link>
  )
}

export default LinkBtns