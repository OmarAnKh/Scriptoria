import React from 'react'
import image from './../../img/access-denied.png'
import { Link } from 'react-router-dom'
import Navbar from './../navbar/Navbar'
import { useTranslation } from 'react-i18next';

const NoAccessPage = () => {
  const {t} = useTranslation()
  return (
    <>
    <Navbar/>
    <div className="container py-2 mt-5 text-center">
        <img src={image} alt="no-access" className="img-fluid" width="400" />
      </div>
      <div className="text-center mb-5">
      <p className="fw-bold h1">{t("ErrorPages.Access-Denied")}</p>
        <p
          className="h5 fw-bold text-decoration-none"
        >
          {t("ErrorPages.you-have-no-access-to-reach-this-page")}
        </p>
        <Link to={'/'} className="h5 fw-bold text-secondary text-decoration-none">{t("ErrorPages.return-to-home-page")}</Link>
      </div>
    </>
  )
}

export default NoAccessPage