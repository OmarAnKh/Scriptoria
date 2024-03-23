import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './BookShelf.css'
import Book from "./book/Book.js";


const works = [
    {
      id: 1,
      img: 'https://d1466nnw0ex81e.cloudfront.net/n_iv/600/715769.jpg'
    },
    {
      id: 2,
      img: 'https://comicvine.gamespot.com/a/uploads/scale_medium/0/3125/2289664-walt1.jpg'
    },
    {
      id: 3,
      img: 'https://i.pinimg.com/originals/ec/17/50/ec1750155aba43fbb77b5ae5354b4eff.jpg'
    },
    {
      id: 4,
      img: 'https://freshcomics.s3.amazonaws.com/issue_covers/MAR160461.jpg'
    } 
]
  
const readingList = [
    {
      id: 1,
      img: 'https://1.bp.blogspot.com/-dxRQjpu6lWI/WtaooLQAsxI/AAAAAAAAQFA/LdV2nNaypxYK2TQZozeIdlQ_qhHpqB_XgCEwYBhgL/s1600/AC_Cv1000_var1960.jpg'
    },
    {
      id: 2,
      img: 'https://3.bp.blogspot.com/_eAs_CUZnVbk/S8E2zwGs3II/AAAAAAAAAZk/OFlq5PUNJtw/s1600/Fantastic+Four+197+Cover.jpg'
    },
    {
      id: 3,
      img: 'https://d1466nnw0ex81e.cloudfront.net/n_iv/600/3009011.jpg'
    },
    {
      id: 4,
      img: 'https://img.gocollect.com/eyJidWNrZXQiOiJnb2NvbGxlY3QuaW1hZ2VzLnB1YiIsImtleSI6IjFhNGVlMDdhLTg2MDItNGQ4My05YzkwLWEyYmI1ZGIxYTJjNi5qcGciLCJlZGl0cyI6W119'
    } 
]


// Responsive property for the <Carousel> tag from react-multi-carousel package
const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    }
};

const BookShelf =  (props) => {

    const CustomLeftArrow = ({ onClick }) => (
        <button className="custom-arrow custom-left-arrow" onClick={onClick}>
          &lt; {/* left arrow symbol */}
        </button>
    );
      
    const CustomRightArrow = ({ onClick }) => (
        <button className="custom-arrow custom-right-arrow" onClick={onClick}>
          &gt; {/* right arrow symbol */}
        </button>
    );

    return(
        <div className="mx-5 my-5">
            <div className="carousel-container works-books my-5">

                <div className="d-flex justify-content-between my-2">
                    <h1 className="fw-bold d-inline-block shelf-title">Works</h1>
                    <button type="button" class="btn btn-outline-primary view-button">See all works</button>
                </div>

                <Carousel  
                responsive={responsive}
                containerClass="custom-carousel hide-arrows"
                itemClass="custom-slide"
                infinite={true} 
                swipeable={true}
                draggable={false}
                showDots={false}
                ssr={true} 
                autoPlay={false}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition="transform 1000ms ease-in-out"
                transitionDuration={800}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                deviceType={props.deviceType}
                dotListClass="custom-dot-list-style"
                focusOnSelect={true}
                partialVisbile={false}
                customRightArrow={<CustomRightArrow />}
                customLeftArrow={<CustomLeftArrow />}
                >
                    {works.map((book) => {
                    return (
                        <div className="row justify-content-center">
                            <div className="col-lg-12">
                                <Book data={book}/>
                            </div>
                        </div>
                    )
                    })}
                </Carousel>

            </div>
            <div style={{ textAlign: 'center', marginTop: -55 }}>
                <img src="https://dadpreneurbook.com/wp-content/themes/off-the-shelf/images/shelfs/shelf_metal.png" style={{ display: 'inline-block', width: 660}} className="shelf-img"/>
            </div>



            <div className="carousel-container reading-list-books my-5">
                    
                <div className="d-flex justify-content-between my-3">
                    <h1 className="fw-bold d-inline-block shelf-title">Reading list</h1>
                    <button type="button" class="btn btn-outline-primary view-button">All reading list</button>
                </div>
                      
                <Carousel  
                responsive={responsive}
                containerClass="custom-carousel"
                itemClass="custom-slide"
                infinite={true} 
                swipeable={false}
                draggable={false}
                showDots={false}
                ssr={true} 
                autoPlay={false}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition="transform 1000ms ease-in-out"
                transitionDuration={800}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                deviceType={props.deviceType}
                dotListClass="custom-dot-list-style"
                focusOnSelect={true}
                partialVisbile={false}
                customRightArrow={<CustomRightArrow />}
                customLeftArrow={<CustomLeftArrow />}
                >
                    {readingList.map((book) => {
                        return (
                            <div className="row justify-content-center">
                                <div className="col-lg-12">
                                    <Book data={book}/>
                                </div>
                            </div>
                        )
                    })}
                </Carousel>

            </div>

            <div style={{ textAlign: 'center', marginTop: -55 }}>
                <img src="https://dadpreneurbook.com/wp-content/themes/off-the-shelf/images/shelfs/shelf_metal.png" style={{ display: 'inline-block', width: 660 }} className="shelf-img"/>
            </div>

        </div>
    );
}

export default BookShelf;