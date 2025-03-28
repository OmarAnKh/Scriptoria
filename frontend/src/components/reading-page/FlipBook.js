import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HTMLFlipBook from 'react-pageflip';
import './FlipBook.css';
import BookPage from './Page.js';
import Sound from './../../audio/PageTurn.mp3';
import Icons from "../story-header/icons/Icons.js";
import { getstory } from "../../api/storyAPI.js";
import Navbar from "../navbar/Navbar.js";
import useSlide from "../../hooks/useSlide.js";
import { Tooltip } from 'react-tooltip';
import { LoaderIcon } from 'react-hot-toast';

// ElevenLabs API Key
const ELEVENLABS_API_KEY = process.env.REACT_APP_ELEVENLABS_API_KEY;

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
    const [voices, setVoices] = useState([]); // List of ElevenLabs voices
    const [selectedVoice, setSelectedVoice] = useState(null); // Selected ElevenLabs voice ID
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0); // Track current page
    const [pageHeights, setPageHeights] = useState([]);
    const [audioInstance, setAudioInstance] = useState(null); // Store audio instance

    // Fetch story data
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

    // Handle window resizing
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 650);
            const newWidth = window.innerWidth * 0.9;
            const maxWidth = 1200;
            setBookWidth(newWidth > maxWidth ? maxWidth : newWidth);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Fetch ElevenLabs voices
    useEffect(() => {
        const fetchVoices = async () => {
            try {
                const response = await fetch("https://api.elevenlabs.io/v1/voices", {
                    method: "GET",
                    headers: {
                        "xi-api-key": ELEVENLABS_API_KEY,
                    },
                });
                const data = await response.json();
                setVoices(data.voices); // Set the list of voices from ElevenLabs
                setSelectedVoice(data.voices[0]?.voice_id || null); // Default to the first voice
            } catch (error) {
                console.error("Error fetching ElevenLabs voices:", error);
            }
        };
        fetchVoices();
    }, []);

    // Stop audio playback on page reload/refresh
    useEffect(() => {
        const handleBeforeUnload = () => {
            setIsSpeaking(false); // Stop speaking state
            const audioElements = document.querySelectorAll('audio');
            audioElements.forEach(audio => audio.pause()); // Pause all audio elements
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    // Calculate page heights dynamically
    useEffect(() => {
        const heights = slide.map((text) => measureTextHeight(text));
        setPageHeights(heights);
    }, [slide, isMobile, bookWidth]);

    // Measure text height dynamically
    const measureTextHeight = (text) => {
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'absolute';
        tempDiv.style.visibility = 'hidden';
        tempDiv.style.whiteSpace = 'pre-wrap';
        tempDiv.style.fontSize = '16px'; // Default font size
        tempDiv.style.width = `${isMobile ? bookWidth : bookWidth / 2}px`;
        tempDiv.innerText = text;
        document.body.appendChild(tempDiv);
        const height = tempDiv.offsetHeight;
        document.body.removeChild(tempDiv);
        return height;
    };

    // Handle page turn
    const handlePageTurn = () => {
        const audio = new Audio(Sound);
        audio.play();
        const newPageIndex = flipBookRef.current?.pageFlip()?.getCurrentPageIndex();
        if (newPageIndex !== undefined) {
            setCurrentPage(newPageIndex);
        }
    };

    // Next button click handler
    const nextButtonClick = () => {
        setDisplayButton(true);
        flipBookRef.current?.pageFlip()?.flipNext();
        setTimeout(() => {
            setDisplayButton(false);
        }, 100);
    };

    // Previous button click handler
    const prevButtonClick = () => {
        setDisplayButton(true);
        flipBookRef.current?.pageFlip()?.flipPrev();
        setTimeout(() => {
            setDisplayButton(false);
        }, 100);
    };

    // Get total pages
    const totalpages = () => {
        return flipBookRef.current?.pageFlip()?.getPageCount() || 0;
    };

    // Get current page index
    const getpageindex = () => {
        return flipBookRef.current?.pageFlip()?.getCurrentPageIndex() || 0;
    };

    // Speak text using ElevenLabs
    const speakText = async () => {
        if (isSpeaking) {
            // If already speaking, stop audio
            if (audioInstance) {
                audioInstance.pause();
                audioInstance.currentTime = 0;
            }
            setIsSpeaking(false);
            return;
        }
        const currentPageIndex = getpageindex();
        const textToSpeak = slide[currentPageIndex]?.trim();
        if (!textToSpeak) {
            console.error("No text to speak.");
            return;
        }
        setIsSpeaking(true); // Start loading
        try {
            const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${selectedVoice}`, {
                method: "POST",
                headers: {
                    "xi-api-key": ELEVENLABS_API_KEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text: textToSpeak,
                    model_id: "eleven_multilingual_v2",
                    voice_settings: {
                        stability: 0.5,
                        similarity_boost: 0.8
                    }
                })
            });
            if (!response.ok) throw new Error("Failed to generate speech");
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            const newAudio = new Audio(audioUrl);
            // Store the audio instance
            setAudioInstance(newAudio);
            newAudio.play();
            newAudio.onended = () => {
                setIsSpeaking(false);
                setAudioInstance(null);
            };
        } catch (error) {
            console.error("Error generating speech:", error);
            setIsSpeaking(false);
        }
    };

    // Pagination text
    const getPaginationText = () => {
        const totalPages = totalpages();
        if (loading) {
            return "Loading...";
        }
        if (totalPages === 0) {
            return "1 - 2";
        }
        if (isMobile) {
            return `${currentPage + 1} | ${totalPages}`;
        } else {
            const page1 = currentPage + 1;
            const page2 = currentPage + 2 <= totalPages ? currentPage + 2 : totalPages;
            return `${page1} - ${page2} | ${totalPages}`;
        }
    };

    return (
        <>
            <Navbar />
            <div className="container-fluid d-flex flex-column align-items-center justify-content-center" style={{ background: `linear-gradient(to bottom, ${color}, rgba(255,0,0,0))`, overflow: 'hidden' }}>
                {loading ? (
                    <div className="text-center">
                        <LoaderIcon />
                        <p className='text-light'>Loading...</p>
                    </div>
                ) : (
                    <>
                        <div className="text-center">
                            <h1 className='display-5 text-center m-3 text-light Scriptoria'> {title} </h1>
                            {
                                voices ? <div className="mb-2 text-light gap-1 d-flex align-items-center justify-content-center">
                                    <button
                                        type="button"
                                        className={`btn rounded-pill btn-${isSpeaking ? 'success' : 'light'} btn-md`}
                                        onClick={speakText}
                                    >
                                        {isSpeaking ? <i className="bi bi-stop-circle-fill"></i> : <i className="bi bi-volume-up-fill text-dark"></i>}
                                    </button>
                                    <select
                                        value={selectedVoice}
                                        onChange={(e) => setSelectedVoice(e.target.value)}
                                        style={{ padding: '5px', borderRadius: '5px' }}
                                    >
                                        {voices?.map((voice) => (
                                            <option key={voice.voice_id} value={voice.voice_id}>
                                                {voice.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                    : ""
                            }
                        </div>
                        <div className="d-flex justify-content-center" style={{ maxWidth: '1200px', width: '100%', overflow: 'hidden' }}>
                            <HTMLFlipBook
                                width={isMobile ? bookWidth : bookWidth / 2}
                                height={Math.max(...pageHeights, 600)} // Use the maximum height of all pages
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
                                            {text}{console.log(text.length)}
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
                <div className='rounded-5 mb-4' style={{ backgroundColor: storyData?.backgroundColor }}>
                    <Icons data={storyData} id={id} setData={setStoryData} />
                </div>
            </div>
        </>
    );
}

export default FlipBook;