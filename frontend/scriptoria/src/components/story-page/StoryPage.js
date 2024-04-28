
import FlipBook from "./flip-book/FlipBook.js";
import React from 'react'
import StoryHeader from "../story-header/StoryHeader"
import StoryCard from "../story-overview/StoryOverview"
import Navbar from '../navbar/Navbar'
const StoryPage = () => {
    return (
        <div>
            <Navbar />
            <StoryHeader />
            <StoryCard />
        </div>
    )
}

export default StoryPage
