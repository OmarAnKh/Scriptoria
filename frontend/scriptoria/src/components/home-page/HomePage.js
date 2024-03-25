import CarouselCards from "../carousel-cards/CarouselCards";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import StoryCard from "../story-card/StoryCard";

const HomePage = () => {
    return (
        <>
            <Navbar />
            <CarouselCards />
            <StoryCard />
            <Footer />
        </>
    );
}

export default HomePage;