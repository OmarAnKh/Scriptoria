import React, {useState, useEffect} from 'react'
import Navbar from '../navbar/Navbar'
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ListCard from './ListCard';
import { getReadingLists} from './../../api/readingListsApi';
import useAuth from '../../hooks/useAuth';
import NoListsPage from '../empty-pages/NoListsPage'

const ListPage = () => {
   const {userName} = useParams()
   const {t} = useTranslation()
   const { auth } = useAuth();
  const [lists, setLists] = useState([]);
  const all = auth?.userName === userName;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const readingLists = await getReadingLists(userName, all);
        setLists(readingLists);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [userName, auth?.userInfo?._id]);

  const update = async () => {
    try {
      const readingLists = await getReadingLists(userName, all);
      setLists(readingLists);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
    <Navbar/>
    {
      lists?.length > 0 ? <>
       <div className='container display-4'>
      {userName}{t("Lists.reading-lists")}
  </div>
  <div className='row justify-content-center'>
  <div className="m-4 justify-content-center">
    <div className="list-cards justify-content-center">
    {lists?.length > 0 ? (
        lists.map((list, index) => (
          <ListCard
            update={update}
            key={index}
            userName={userName}
            list={list}
          />
        ))
      ) : (
        <p>{t("Lists.this-user-may-not-have-one-public-list-at-least")}</p>
      )}
    </div>
  </div>
  </div> 
      </> : <NoListsPage/>
    }
    </>
  )
}

export default ListPage