import axios from 'axios'
import {findAccount} from './accountApi'
const getReadingLists = async (userName) => {    
    try {
        const account = await findAccount({ userName })
        console.log(account);

        const response = await axios({
            url: "http://localhost:5000/readingLists",
            method: "GET",
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
            params : { accountId : account._id }
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

const getStoriesFromRL = async (_id, token) => {
    try {
        const response = await axios({
            url: "http://localhost:5000/readingLists/" + _id,
            method: "GET",
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + token,
            },
            params: {
                _id
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
            url: "http://localhost:5000/readingLists/" + list.id,
            method: "PATCH",
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

const updateReadingLists = async (storyId, checkedLists, token) => {

    const lists = await getReadingLists(token);

    if (!lists) {
        console.error('getReadingLists did not return expected data');
        return;
    }

    try {
        await Promise.all(
            lists.map(async (list) => {
                let stories = list.stories
                if (checkedLists.includes(list._id)) {
                    if (!stories.includes(storyId)) {
                        stories.push(storyId)
                        await updateList(list, token)
                    }
                } else {
                    if (stories.includes(storyId)) {
                        stories = stories.filter(story => story !== storyId)
                        const editedList = {
                            id : list._id,
                            name : list.name,
                            accountId : list.accountId,
                            stories
                        }
                        await updateList(editedList, token)
                    }
                }
            })
        );
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

