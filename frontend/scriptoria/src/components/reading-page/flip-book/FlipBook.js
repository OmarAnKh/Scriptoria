import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HTMLFlipBook from 'react-pageflip';
import './FlipBook.css';
import Page from './Page.js';
import Sound from './../../../audio/PageTurn.mp3';
import Icons from "../../story-header/icons/Icons.js"
import { getstory } from "../../../api/storyAPI.js"
import Navbar from "../../navbar/Navbar";
import useSlide from "../../../hooks/useSlide.js"

function StoryPage(props) {
    const [displayButton, setDisplayButton] = useState(false);
    const flipBookRef = useRef(null);
    const howManycharacters = useRef(0); // Using useRef instead of useState
    const { id } = useParams();
    const [storyData, setStoryData] = useState(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [bookWidth, setBookWidth] = useState(400);
    const [data, setData] = useState({})
    const [counts, setCounts] = useState({})
    const [formattedText, setFormattedText] = useState('');
    const [splittext, setSplitText] = useState([])
    const [slide, setSlide] = useState([])
    const getSlides = useSlide()

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (windowWidth > 900) {
            setBookWidth(windowWidth - 800);
            howManycharacters.current = windowWidth * 1.3;
        } else {
            setBookWidth(0);
            howManycharacters.current = 1000;
        }
    }, [windowWidth]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const story = await getstory(id);
                setStoryData(story);
                setCounts(story.counts)
                setSlide(getSlides(story?.story?.slide?.ops, howManycharacters.current))

            } catch (error) {
                console.error("Error fetching story:", error);
            }
        };

        fetchData();
    }, [id]);

    const handlePageTurn = () => {
        const audio = new Audio(Sound);
        audio.play();
    };

    const nextButtonClick = () => {
        setDisplayButton(true);
        flipBookRef.current?.pageFlip()?.flipNext();
        setTimeout(() => {
            setDisplayButton(false);
        }, 1000);
    };

    const prevButtonClick = () => {
        setDisplayButton(true);
        flipBookRef.current?.pageFlip()?.flipPrev();
        setTimeout(() => {
            setDisplayButton(false);
        }, 1000);
    };


    const totalpages = () => {
        return flipBookRef.current?.pageFlip()?.getPageCount();
    };


    const getpageindex = () => {
        return flipBookRef.current?.pageFlip()?.getCurrentPageIndex();
    };

    return (
        <>
            <Navbar />
            <div className="StoryPage d-flex flex-column align-items-center justify-content-center vh-100">
                <HTMLFlipBook
                    width={400 + bookWidth / 2 - 50}
                    height={600}
                    flippingTime={1000}
                    mobileScrollSupport={true}
                    onFlip={handlePageTurn}
                    ref={flipBookRef}

                >
                    {slide && slide.map((text, index) => (
                        <Page key={index}>
                            <div key={index} dangerouslySetInnerHTML={{ __html: text }}></div>
                        </Page>
                    ))}
                </HTMLFlipBook>

                <div className="justify-content-center mt-4">
                    <button
                        type="button"
                        className="btn-info btn-sm btn-style"
                        onClick={prevButtonClick}
                        disabled={displayButton}
                    >
                        <i className="bi bi-arrow-bar-left h3"></i> Previous page
                    </button>
                    [<span>{getpageindex() + 1 || 1}</span> of <span>{totalpages() || "..."}</span>]
                    <button
                        type="button"
                        className="btn-info btn-sm btn-style "
                        onClick={nextButtonClick}
                        disabled={displayButton}
                    >
                        Next page <i className="bi bi-arrow-bar-right h3"></i>
                    </button>

                </div>
                <div style={{ backgroundColor: storyData?.story.backgroundColor, borderRadius: "5px" }} >
                    <Icons data={counts} id={id} counts={counts} setData={setData} />
                </div>

            </div >
        </>
    );
}

export default StoryPage;
