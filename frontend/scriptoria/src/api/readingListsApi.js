import axios from 'axios'
import {findAccount} from './accountApi'
import { getWriters } from './writers'

const getReadingLists = async (userName, all) => {   
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

const getListWithStories = async (userName,listId) => {
    const account = await findAccount({ userName })
    try {
        const response = await axios({
            url: "http://localhost:5000/lists/" + account._id + "/" + listId,
            method: "GET",
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
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

const getValidStoriesFrom = async (owner, listId, myId )=>{
    try {
        const notFilteredList = (await getListWithStories(owner, listId)).data
        const stories = await Promise.all(
        notFilteredList.stories.map(async (story) => {
            if(story.publishStatus) {
                return story
            } 
            else {
                const response = await getWriters(story._id)
                const writers = response.state ? response.users : []
                if(writers.length>0){
                const found = writers.find(writer => writer.AccountId === myId)
                if(found) return story
                }
            }
            })
        )
        const list = {...notFilteredList, stories}
        return list
        } catch (error) {
        console.log(error)
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
    getListWithStories,
    deleteReadingList,
    updateList,
    getValidStoriesFrom
}

