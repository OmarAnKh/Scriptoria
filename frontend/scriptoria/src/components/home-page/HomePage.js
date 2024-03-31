import CarouselCards from "../carousel-cards/CarouselCards";
import DiscoverTable from "../discover-tab/DiscoverTable";
import StoryCard from "../story-card/StoryCard";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";


const HomePage = () => {
    return (
        <>
            <Navbar />
            <CarouselCards />
            <DiscoverTable />
            <StoryCard />
            <Footer />
        </>
    );
}

export default HomePage;
