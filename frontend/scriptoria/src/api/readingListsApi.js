import axios from 'axios'
import {findAccount} from './accountApi'
const getReadingLists = async (userName, all) => {   
    console.log(all) 
    console.log(userName)
    try {
        const account = await findAccount({ userName })
        console.log(account)
        const response = await axios({
            url: "http://localhost:5000/readingLists",
            method: "GET",
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
            params : { accountId : account._id, all }
        });
        return response.data; 
    } catch (error) {
        console.log(error);
    }
}


const createReadingList = async (list, token) => {
    try {
        await axios({
            url: "http://localhost:5000/readingLists",
            method: "POST",
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + token,
            },
            data: list
        })
    } catch (error) {
        console.log(error)
    }
}

const getStoriesFromRL = async (listId, token) => {
    try {
        const response = await axios({
            url: "http://localhost:5000/readingLists/" + listId,
            method: "GET",
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + token,
            },
            params: {
                listId
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

const updateList = async (list, token) => {
    
    try {
        await axios({
            url: "http://localhost:5000/readingLists/" + list._id,
            method: "PATCH",
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + token,
            },
            data: { 
                stories: list.stories,
                name: list.name,
                privacy: list.privacy
            }
        });
    } catch (error) {
        console.log(error)
    }
}


const updateReadingLists = async (storyId, checkedLists, userName ,token) => {
    try {
        const lists = await getReadingLists(userName, true);
        if(lists){
        await Promise.all(
            lists.map(async (list) => {
                let stories = list.stories;
                if (checkedLists.includes(list._id)) {
                    if (!stories.includes(storyId)) {
                        stories.push(storyId);
                        await updateList(list, token);
                    }
                } else {
                    if (stories.includes(storyId)) {
                        stories = stories.filter(story => story !== storyId);
                        const editedList = {
                            _id: list._id,
                            name: list.name,
                            accountId: list.accountId,
                            privacy: list.privacy,
                            stories
                        };
                        await updateList(editedList, token);
                    }
                }
            })
        );}
    } catch (error) {
        console.error(error);
    }
}


const deleteReadingList = async(id, token) =>{
    try {
        await axios({
            url: "http://localhost:5000/readingLists/" + id,
            method: "DELETE",
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + token,
            },
            params: { id }
        })
    } catch (error) {
        console.log(error)
    }
}

export {
    getReadingLists,
    createReadingList,
    updateReadingLists,
    getStoriesFromRL,
    deleteReadingList,
    updateList
}

