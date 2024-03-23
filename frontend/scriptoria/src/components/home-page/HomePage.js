import CarouselCards from "../carousel-cards/CarouselCards";
import StoryCard from "../story-card/StoryCard";
import Cookies from 'js-cookie';

const HomePage = () => {
    return (
        <>
            {console.log(Cookies.get("userInfo"))}
            <CarouselCards />
            <StoryCard />
        </>
    );
}

export default HomePage;