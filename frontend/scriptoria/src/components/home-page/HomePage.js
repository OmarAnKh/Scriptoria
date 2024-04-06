import CarouselCards from "../carousel-cards/CarouselCards";
import DiscoverTable from "../discover-tab/DiscoverTable";
import StoryCard from "../story-card/StoryCard";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";


const HomePage = () => {
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        if (Cookies.get("userInfo")) {
            setAlert(true);
            toast.success("You are signed in");
        }
    }, []); 

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
