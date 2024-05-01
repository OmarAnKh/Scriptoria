import { useEffect, useState } from "react";
import Card from "./Card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { getStories } from "../../api/storyAPI";


// Responsive property for the <Carousel> tag from react-multi-carousel package
const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
    }
};



const CarouselCards = (props) => {

    const [stories, setStories] = useState([])
    const numOfStories = 5

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await getStories('stories', numOfStories);
                setStories(response);

            } catch (error) {
                console.log(error)
            }
        }

        fetchStories();

    }, []);


    return (
        <>
        {stories?.length ?
            <Carousel swipeable={false}
            draggable={false}
            showDots={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={false}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="transform 1000ms ease-in-out"
            transitionDuration={800}
            containerClass="carousel-container-cards"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            deviceType={props.deviceType}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            centerMode={true}
            focusOnSelect={true}
            >

            {stories?.map((story) => {
                return (
                    <div className="row justify-content-center" key={story._id}>
                        <div className="col-lg-12">
                            <Card data={story} />
                        </div>
                    </div>
                )
            })}

            </Carousel> : <></> }
        </>
    );
}

export default CarouselCards;