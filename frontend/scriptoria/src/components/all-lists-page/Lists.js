import React, { useState, useEffect } from 'react';
import ListCard from './ListCard';
import { getReadingLists} from './../../api/readingListsApi';
import useAuth from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import './AllListsPage.css';

const Lists = ({ userName }) => {
  const { auth } = useAuth();
  const { t } = useTranslation()
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
  );
};

export default Lists;
