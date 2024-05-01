import React from 'react'
import image from './../../img/empty-list.png'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

const EmptyList = () => {
  const {t} = useTranslation()
  return (
    <>
    <div className="container align-items-center py-2 mt-5 text-center">
        <img src={image} alt="logout" className="img-fluid" width="500"/>
      </div>
      <div className="text-center mb-5">
        <p className="fw-bold h1">{t("ErrorPages.this-list-may-not-contain-one-story-at-least")}</p>
        <Link to={'/'} className="h5 fw-bold text-secondary text-decoration-none">{t("ErrorPages.return-to-home-page")}</Link>
      </div>
    </>
  )
}

export default EmptyList