import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HTMLFlipBook from 'react-pageflip';
import './FlipBook.css';
import BookPage from './Page.js';
import Sound from './../../../audio/PageTurn.mp3';
import Icons from "../../story-header/icons/Icons.js"
import { getstory } from "../../../api/storyAPI.js"
import Navbar from "../../navbar/Navbar";
import useSlide from "../../../hooks/useSlide.js"
import { Tooltip } from 'react-tooltip';

function FlipBook() {
    const [displayButton, setDisplayButton] = useState(false);
    const flipBookRef = useRef(null);
    const { id } = useParams();
    const [storyData, setStoryData] = useState({});
    const [bookWidth, setBookWidth] = useState(window.innerWidth * 0.8);
    const [title, setTitle] = useState([]);
    const [slide, setSlide] = useState([]);
    const [color, setColor] = useState(null);
    const getSlides = useSlide();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 650);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0); // Track current page

    const CHARACTERS_PER_SLIDE = 1000;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const story = await getstory(id);
                setStoryData(story.story);
                setSlide(getSlides(story?.story?.slide?.ops, CHARACTERS_PER_SLIDE));
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

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 650);
            const newWidth = window.innerWidth * 0.8;
            const maxWidth = 1200;
            setBookWidth(newWidth > maxWidth ? maxWidth : newWidth);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const populateVoices = () => {
            const availableVoices = speechSynthesis.getVoices();
            setVoices(availableVoices);
            setSelectedVoice(availableVoices[0]?.name || null);
        };

        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = populateVoices;
        }

        populateVoices();
    }, []);

    useEffect(() => {
        // Stop speech synthesis on page unload/reload
        const handleUnload = () => {
            speechSynthesis.cancel();
        };

        window.addEventListener('beforeunload', handleUnload);

        return () => {
            window.removeEventListener('beforeunload', handleUnload);
            speechSynthesis.cancel();
        };
    }, []);

    const handlePageTurn = () => {
        const audio = new Audio(Sound);
        audio.play();

         // Update currentPage immediately after the flip
        const newPageIndex = flipBookRef.current?.pageFlip()?.getCurrentPageIndex();
        if (newPageIndex !== undefined) {
            setCurrentPage(newPageIndex);
        }
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
        return flipBookRef.current?.pageFlip()?.getPageCount() || 0; // Ensure a default value
    };

    const getpageindex = () => {
        return flipBookRef.current?.pageFlip()?.getCurrentPageIndex() || 0; // Ensure a default value
    };

    const speakText = () => {
        if (isSpeaking) {
            speechSynthesis.cancel();
            setIsSpeaking(false);
        } else {
            const currentPageIndex = getpageindex();
            const textToSpeak = slide.slice(currentPageIndex).join(" ");
            const utterance = new SpeechSynthesisUtterance(textToSpeak);

            const selectedVoiceObj = voices.find((voice) => voice.name === selectedVoice);
            if (selectedVoiceObj) {
                utterance.voice = selectedVoiceObj;
            }

            speechSynthesis.speak(utterance);
            setIsSpeaking(true);

            utterance.onend = () => {
                setIsSpeaking(false);
            };
        }
    };

    const getPaginationText = () => {
        const totalPages = totalpages();

        if (loading) {
            return "Loading..."; // Or any other appropriate message
        }

        if (totalPages === 0) {
            return "1 - 2";  // Handle the case where totalPages is zero
        }

        const currentPageIndex = getpageindex();

        if (isMobile) {
            return `${currentPageIndex + 1} | ${totalPages}`;
        } else {
            const page1 = currentPageIndex + 1;
            const page2 = currentPageIndex + 2 <= totalPages ? currentPageIndex + 2 : totalPages;
            return `${page1} - ${page2} | ${totalPages}`;
        }
    };

    return (
        <>
        <Navbar/>
        
        <div className="container-fluid d-flex flex-column align-items-center justify-content-center" style={{ background: `linear-gradient(to bottom, ${color}, rgba(255,0,0,0))`, overflow: 'hidden' }}>
            {loading ? (
                <div className="text-center">
                    <p className='text-light'>Loading...</p>
                </div>
            ) : (
                <>
                    <div className="text-center">
                        <h1 className='display-5 text-center m-3 text-light Scriptoria'> {title} </h1>

                        <div className="mb-2 text-light gap-1 d-flex align-items-center justify-content-center">
                            <button
                                type="button"
                                className={`btn rounded-pill btn-${isSpeaking ? 'success' : 'light'} btn-md`}
                                onClick={speakText}
                            >
                                {isSpeaking ? <i class="bi bi-stop-circle-fill"></i> : <i class="bi bi-volume-up-fill text-dark"></i> }
                            </button>
                            <select
                                value={selectedVoice}
                                onChange={(e) => setSelectedVoice(e.target.value)}
                                style={{ padding: '5px', borderRadius: '5px' }}
                            >
                                {voices.map((voice, index) => (
                                    <option key={index} value={voice.name}>
                                        {voice.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center" style={{ maxWidth: '1200px', width: '100%', overflow: 'hidden' }}>
                        <HTMLFlipBook
                            width={isMobile ? bookWidth : bookWidth / 2}
                            height={600}
                            size="stretch"
                            minWidth={250}
                            flippingTime={1000}
                            mobileScrollSupport={true}
                            onFlip={handlePageTurn}
                            ref={flipBookRef}
                            pagesPerSheet={isMobile ? 1 : 2}
                        >
                            {slide && slide.map((text, index) => (
                                <BookPage key={index}>
                                    <div className="page-text" key={index}>
                                        {text}
                                        <div className="page-number" style={{ position: 'absolute', bottom: '5px', right: '10px', fontSize: '10px', color: '#aaa' }}>
                                            {index + 1}
                                        </div>
                                    </div>
                                </BookPage>
                            ))}
                        </HTMLFlipBook>
                    </div>

                    <div className="pagination-controls text-center mt-4 mb-3 d-flex align-items-center justify-content-between" style={{ width: '80%', maxWidth: '600px' }}>
                        <button
                            type="button"
                            className="btn-info col-auto btn btn-light border-0 rounded-pill"
                            onClick={prevButtonClick}
                            disabled={displayButton}
                            style={{ background: color }}
                            data-tooltip-id="my-tooltip" data-tooltip-content="previous page" data-tooltip-place="top"
                        >
                            <i className="bi bi-arrow-left text-light h3"></i>
                        </button>

                        <span className="pagination-text col-auto" style={{ fontSize: '1.2em', color: 'white', fontWeight: 'bold' }}>
                            {getPaginationText()}
                        </span>

                        <button
                            type="button"
                            className="btn-info col-auto btn btn-light border-0 rounded-pill"
                            onClick={nextButtonClick}
                            disabled={displayButton}
                            style={{ background: color }}
                            data-tooltip-id="my-tooltip" data-tooltip-content="next page" data-tooltip-place="top"
                        >
                            <i className="bi bi-arrow-right text-light h3"></i>
                        </button>
                        <Tooltip id="my-tooltip" />
                    </div>
                </>
            )}
            <div className='rounded-5 mb-4' style={{ backgroundColor: storyData?.backgroundColor }} >
                <Icons data={storyData} id={id} setData={setStoryData} />
            </div>
        </div>
        
        </>
    );
}

export default FlipBook;