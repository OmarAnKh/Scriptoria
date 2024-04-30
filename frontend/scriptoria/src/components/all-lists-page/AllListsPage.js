import React from 'react'
import Navbar from '../navbar/Navbar'
import Lists from './Lists'
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ListPage = () => {
  const { userName } = useParams()
  const { t } = useTranslation()
  return (
    <>
      <Navbar />
      <div className='container display-4'>
        {userName}{t("Lists.reading-lists")}
      </div>
      <div className='row justify-content-center'>
        <Lists userName={userName} />
      </div>
    </>
  )
}

export default ListPage