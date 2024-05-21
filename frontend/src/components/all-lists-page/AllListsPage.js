import React, {useState, useEffect} from 'react'
import Navbar from '../navbar/Navbar'
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ListCard from './ListCard';
import { getReadingLists} from './../../api/readingListsApi';
import useAuth from '../../hooks/useAuth';
import NoListsPage from '../empty-pages/NoListsPage'
import LoadingPage from '../loading-page/LoadingPage';

const AllListsPage = () => {
   const {userName} = useParams()
   const {t} = useTranslation()
   const { auth } = useAuth();
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true)
  const [updateFlag, setUpdateFlag] = useState(true)
  const all = auth?.userName === userName;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const readingLists = await getReadingLists(userName, all);
        setLists(readingLists);
        setLoading(false)
      } catch (error) {
        console.error(error);
        setLoading(false)
      }
    };
    fetchData();
  }, [userName, auth?.userInfo?._id, updateFlag]);

  const update = async () => {
    setUpdateFlag(!updateFlag)
  };
  return ( loading ? <LoadingPage/> : 
    <>
    <Navbar/>
    {
      lists?.length > 0 ? <>
       <div className='container lists-page-title display-4'>
      {userName}{t("Lists.reading-lists")}
  </div>
  <div className='row justify-content-center'>
  <div className="m-4 justify-content-center">
    <div className="list-cards justify-content-center">
        {lists.map((list, index) => (
          <ListCard
          updateFlag={updateFlag}
            setUpdateFlag={setUpdateFlag}
            key={index}
            userName={userName}
            list={list}
          />
        ))}   
    </div>
  </div>
  </div> 
      </> : <NoListsPage/>
    }
    </>
  )
}

export default AllListsPage