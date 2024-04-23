import React, {useState, useEffect} from 'react'
import ListCard from './ListCard'
import {getReadingLists} from './../../api/readingListsApi'
import './ListsPage.css'
const Lists = ({userName}) => {
  const [lists, setLists] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const readingLists = await getReadingLists(userName);
        console.log("Reading lists:", readingLists);
        setLists(readingLists);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  



  return (
      <div className="container m-4 justify-content-center">
        <div className="list-cards justify-content-center" >
          {lists ? (
            lists.map((list, index) => {
              return <ListCard key={index} userName={userName} list={list} />;
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    );
}

export default Lists