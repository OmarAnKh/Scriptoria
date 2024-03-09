import Card from "./Card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


// Data
const comics = [
    {
        id: 1,
        title: 'Green Lantern',
        author: 'Geoff Jones',
        votes: 1000,
        rating: 4,
        description: 'Green Lantern is the name of several superheroes appearing in American comic books. They fight evil with the aid of rings that grant them a variety of extraordinary powers.',
        bgColor: 'bg-success',
        textColor: 'text-light',
        cover: 'https://www.firstcomicsnews.com/wp-content/uploads/2018/09/tgl_cv1_fpo1.jpg'
    }, 
    {
        id: 2,
        title: 'Spider-man',
        author: 'Slott Meen',
        votes: 2050,
        rating: 3,
        description: 'Spider-Man is a superhero appearing in American comic books published by Marvel Comics.',
        bgColor: 'bg-primary',
        textColor: 'text-light',
        cover: 'https://img.chelmerfineart.com/original/the-amazing-spider-man-001-21205.jpg'
    },
    {
        id: 3,
        title: 'Stranger Things',
        author: 'Jody Houser',
        votes: 1743,
        rating: 2,
        description: 'Spider-Man is a superhero appearing in American comic books published by Marvel Comics.',
        bgColor: 'bg-danger',
        textColor: 'text-light',
        cover: 'https://i.pinimg.com/originals/a3/60/28/a360288546fbf3155a10fc481dd7a433.jpg'
    },
    {
        id: 4,
        title: 'Batman',
        author: 'Bill Finger',
        votes: 2390,
        rating: 4.4,
        description: 'Batman is a superhero appearing in American comic books published by DC Comics. ',
        bgColor: 'bg-dark',
        textColor: 'text-light',
        cover: 'https://comicvine.gamespot.com/a/uploads/scale_super/0/6063/5265828-bm_cv1_ds.jpg'
    },
    {
        id: 5,
        title: 'Superman',
        author: 'Joe Shuster',
        votes: 1500,
        rating: 3.5,
        description: 'Superman is a superhero who appears in American comic books published by DC Comics.',
        bgColor: 'bg-warning',
        textColor: 'text-light',
        cover: 'https://www.brooklyncomicshop.com/BCS/wp-content/uploads/2019/02/Action-Comics-419-Brooklyn-Comic-Shop.jpg.jpeg'
    },
    {
        id: 5,
        title: 'The Avengers',
        author: 'Stan Lee',
        votes: 1743,
        rating: 2.3,
        description: 'The Avengers are a team of superheroes appearing in American comic books published by Marvel Comics.',
        bgColor: 'bg-primary',
        textColor: 'text-light',
        cover: 'https://www.cultture.com/pics/2021/02/las-10-mejores-portadas-de-los-comics-de-los-vengadores-de-los-anos-60-clasificadas-0.jpg'
    },
    {
        id: 6,
        title: 'Mickey Mouse',
        author: 'Walt Disney',
        votes: 3201,
        rating: 5,
        description: 'Mickey Mouse is a Disney comic book series that has a long-running history, first appearing in 1943 as part of the Four Color one-shot series.',
        bgColor: 'bg-info',
        textColor: 'text-light',
        cover: 'https://2.bp.blogspot.com/-fj2bK2BP_ZY/TbNiNOS0PyI/AAAAAAAAA6Y/1QBigkFg-EM/s1600/mm307.jpg'
    },
    {
        id: 7,
        title: 'Stherlock Holmes',
        author: 'Arthur Conan Doyle',
        votes: 2003,
        rating: 1.7,
        description: 'Sherlock Holmes is a fictional detective created by British author Arthur Conan Doyle. Referring to himself as a "consulting detective" in the stories.',
        bgColor: 'bg-secondary',
        textColor: 'text-light',
        cover: 'https://i.pinimg.com/originals/2a/cb/6a/2acb6a38de74b236dcf8e4e036e2c8cf.jpg'
    }
]

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
    return (
        
        <Carousel  swipeable={false}
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
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType={props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        centerMode={true}
        focusOnSelect={true}
        >

            {comics.map((comic) => {
                return (
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <Card data={comic}/>
                        </div>
                    </div>
                )
            })}

        </Carousel>
    );
}

export default CarouselCards;