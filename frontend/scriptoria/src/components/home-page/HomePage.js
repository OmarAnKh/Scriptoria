import CarouselCards from "../carousel-cards/CarouselCards";
import FriendsList from "../friends-list/FriendsList";
import StoryCard from "../story-card/StoryCard";
import Cookies from 'js-cookie';

const HomePage = () => {
    return (
        <>
            {console.log(Cookies.get("userEmail"))}
            <CarouselCards />
            <StoryCard />
            <FriendsList/>
        </>
    );
}

export default HomePage;