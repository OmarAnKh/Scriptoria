import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import NavBar from '../navbar/Navbar'
import FlipBook from './FlipBook';
import { getstory } from '../../api/storyAPI';
import useSlide from "../../hooks/useSlide.js";
import Icons from '../story-header/icons/Icons';
import { LoaderIcon } from 'react-hot-toast';

const ReadingPage = () => {
    const [title, setTitle] = useState([]);
    const [slide, setSlide] = useState([]);
    const [color, setColor] = useState(null);
    const [storyData, setStoryData] = useState({});
    const [loading, setLoading] = useState(true);
    const getSlides = useSlide();
    const { id } = useParams();

    //fetch story data
    useEffect(() => {
            const fetchData = async () => {
                try {
                    const story = await getstory(id);
                    setStoryData(story.story);
                    setSlide(getSlides(story?.story?.slide?.ops));
                    setTitle(story?.story?.title);
                    setColor(story?.story?.backgroundColor);
                } catch (error) {
                    console.error("Error fetching story:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }, [id]);

  return (
    <>
        <NavBar/>
        <div className="container-fluid d-flex flex-column align-items-center justify-content-center" style={{ background: `linear-gradient(to bottom, ${color}, rgba(255,0,0,0))`, overflow: 'hidden' }}>
            {
                loading? (
                    <div className="text-center">
                        <LoaderIcon />
                        <p className='text-light'>Loading...</p>
                    </div>
                ) : (
                    <FlipBook title={title} storyData={storyData}  slide={slide} color={color}/>
                )
            }
        
        <div className='rounded-5 mb-4' style={{ backgroundColor: storyData?.backgroundColor }}>
            <Icons data={storyData} id={id} setData={setStoryData} />
        </div>
        </div>
    </>
  )
}

export default ReadingPage