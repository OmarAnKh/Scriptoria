import CarouselCards from "../carousel-cards/CarouselCards";
import DiscoverTable from "../discover-tab/DiscoverTable";
import StoryCard from "../story-card/StoryCard";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar.js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import WelcomeCard from "../welcome-card/WelcomeCard.js";

const HomePage = () => {
    const [alert, setAlert] = useState(false);
    const [selectedTab, setSelectedTab] = useState('all');
    const { auth } = useAuth();

    useEffect(() => {
        if (auth.userName) {
            setAlert(true);
            toast.success("You are signed in");
        }
    }, []);


    const handleTabSelect = (tabName) => {
        setSelectedTab(tabName);
    };


    return (
        <>
            <Navbar />
            {!auth.userName ? <WelcomeCard /> : <></>}
            <CarouselCards />
            <DiscoverTable select={selectedTab} onSelect={handleTabSelect} />
            <StoryCard selectedTab={selectedTab} />
            <Footer />
        </>
    );
}


export default HomePage;