import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import HTMLFlipBook from 'react-pageflip';
import './FlipBook.css';
import Page from './Page.js';
import Sound from './../../../audio/PageTurn.mp3';
import Icons from "../../story-header/icons/Icons.js"
import { getstory } from "../../../api/storyAPI.js"
import Navbar from "../../navbar/Navbar";


function splitStringIntoChunks(text, Words) { // Function to split a string into smaller strings chunkSize = 150 = how many words for each string
    const words = text.split(/\s+/);
    const chunks = [];
    let currentChunk = [];

    for (const word of words) {
        currentChunk.push(word);
        if (currentChunk.length >= Words) {
            chunks.push(currentChunk.join(' '));
            currentChunk = [];
        }
    }

    if (currentChunk.length > 0) {
        chunks.push(currentChunk.join(' '));
    }

    return chunks;
}

function StoryPage(props) {
    const [displayButton, setDisplayButton] = useState(false);
    const flipBookRef = useRef(null);
    const { id } = useParams();
    const [storyData, setStoryData] = useState(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [bookWidth, setBookWidth] = useState(400);
    const [howManyWords, setHowManyWords] = useState(10)
    const [data, setData] = useState({})
    const [counts, setCounts] = useState({})

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
            setHowManyWords(windowWidth / 8 - 40)
        } else {
            setBookWidth(0);
            setHowManyWords(65)
        }
    }, [windowWidth]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const story = await getstory(id);
                setStoryData(story);
                setCounts(story.counts)
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

    const totalPage = () => {
        return flipBookRef.current?.pageFlip()?.getPageCount();
    };

    const getpageindex = () => {
        return flipBookRef.current?.pageFlip()?.getCurrentPageIndex();
    };
    const staticData = "StoryPage d-flex flex-column align-items-center justify-content-center vh-100 StoryPage d-flex flex-column align-items-center justify-content-center vh-100 StoryPage d-flex flex-column align-items-center justify-content-center vh-100 StoryPage d-flex flex-column align-items-center justify-content-center vh-100 StoryPage d-flex flex-column align-items-center justify-content-center vh-100 StoryPage d-flex flex-column align-items-center justify-content-center vh-100 StoryPage d-flex flex-column align-items-center justify-content-center vh-100 StoryPage d-flex flex-column align-items-center justify-content-center vh-100 StoryPage d-flex flex-column align-items-center justify-content-center vh-100 StoryPage d-flex flex-column align-items-center justify-content-center vh-100 StoryPage d-flex flex-column align-items-center justify-content-center vh-100 StoryPage d-flex flex-column align-items-center justify-content-center vh-100 StoryPage d-flex flex-column align-items-center justify-content-center vh-100 StoryPage d-flex flex-column align-items-center justify-content-center vh-100 StoryPage d-flex flex-column align-items-center justify-content-center vh-100 StoryPage d-flex flex-column align-items-center justify-content-center vh-100 StoryPage d-flex flex-column align-items-center justify-content-center vh-100 StoryPage d-flex flex-column align-items-center justify-content-center vh-100 StoryPage d-flex flex-column align-items-center justify-content-center vh-100 StoryPage d-flex flex-column align-items-center justify-content-center vh-100 StoryPage d-flex flex-column align-items-center justify-content-center vh-100 StoryPage d-flex flex-column align-items-center justify-content-center vh-100 StoryPage d-flex flex-column align-items-center justify-content-center vh-100 StoryPage d-flex flex-column align-items-center justify-content-center vh-100 StoryPage d-flex flex-column align-items-center justify-content-center vh-100 StoryPage d-flex flex-column align-items-center justify-content-center vh-100 StoryPage d-flex flex-column align-items-center justify-content-center vh-100 StoryPage d-flex flex-column align-items-center justify-content-center vh-100 StoryPage d-flex flex-column align-items-center justify-content-center vh-100 StoryPage d-flex flex-column align-items-center justify-content-center vh-100 StoryPage d-flex flex-column align-items-center justify-content-center vh-100 StoryPage d-flex flex-column align-items-center just "
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
                    {storyData && splitStringIntoChunks(staticData, howManyWords).map((text, index) => ( // here to put the data.slide
                        <Page key={index} number={index + 1}>{text}</Page>
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
                    [<span>{getpageindex() + 1 || 1}</span> of <span>{totalPage() || "..."}</span>]
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

            </div>
        </>
    );
}

export default StoryPage;
