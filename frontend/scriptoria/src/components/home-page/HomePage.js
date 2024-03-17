import CarouselCards from "../carousel-cards/CarouselCards";
import Navbar from "../nav-bar-home/NavbarHome";
import SearchBar from "../nav-bar-home/SearchBar";
import Tab from "../discover-tab/DiscoverTab";
import StoryCard from "../story-card/StoryCard";
import Footer from "../footer/Footer";


const HomePage = () => {
    return (
        <>
        <Navbar/>
            <CarouselCards />
            <br/>
<Tab/>
<br/>
            <StoryCard />
            <Footer/>

        </>

    );
}

export default HomePage;