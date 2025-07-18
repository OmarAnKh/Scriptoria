import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HTMLFlipBook from 'react-pageflip';
import './FlipBook.css';
import BookPage from './Page.js';
import Sound from './../../audio/PageTurn.mp3';
import { Tooltip } from 'react-tooltip';
import { LoaderIcon } from 'react-hot-toast';
// ElevenLabs API Key
const ELEVENLABS_API_KEY = process.env.REACT_APP_ELEVENLABS_API_KEY;

function FlipBook({title, slide, color}) {
    const [displayButton, setDisplayButton] = useState(false);
    const flipBookRef = useRef(null);
    const location = useLocation(); // Detect route changes
    const [bookWidth, setBookWidth] = useState(window.innerWidth * 0.8);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 650);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voices, setVoices] = useState([]); // List of ElevenLabs voices
    const [selectedVoice, setSelectedVoice] = useState(null); // Selected ElevenLabs voice ID
    const [currentPage, setCurrentPage] = useState(0); // Track current page
    const [pageHeights, setPageHeights] = useState([]);
    const [audioInstance, setAudioInstance] = useState(null); // Store audio instance
    const [errorMessage, setErrorMessage] = useState(null);
    const [audioLoading, setAudioLoading] = useState(false); // Loader for audio generation
    const [audioPausedTime, setAudioPausedTime] = useState(0); // Track audio pause time
    const [showContinueButton, setShowContinueButton] = useState(false); // Show continue button

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

    // Stop audio playback on page reload/refresh or navigation
    useEffect(() => {
        const handleBeforeUnload = () => {
            if (audioInstance) {
                audioInstance.pause();
                audioInstance.currentTime = 0;
            }
            setIsSpeaking(false); // Stop speaking state
        };
        const handleRouteChange = () => {
            if (audioInstance) {
                audioInstance.pause();
                audioInstance.currentTime = 0;
            }
            setIsSpeaking(false);
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        const unlisten = () => {
            handleRouteChange();
        };
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            unlisten(); // Cleanup listener
        };
    }, [audioInstance, location]); // Add `location` as a dependency

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

    const speakText = async (mode = "play") => {
        if (isSpeaking && audioInstance) {
            // Case: Stop audio if it's already playing
            audioInstance.pause();
            setAudioPausedTime(audioInstance.currentTime); // Save the paused time
            setShowContinueButton(true); // Show the "continue" button
            setIsSpeaking(false); // Reset speaking state
            return;
        }
        const currentPageIndex = getpageindex();
        const textToSpeak = slide[currentPageIndex]?.trim();
        if (!textToSpeak) {
            setErrorMessage("No text available for speech on this page.");
            return;
        }
        setIsSpeaking(false); // Reset speaking state before loading
        setAudioLoading(true); // Show loader
        setShowContinueButton(false)
        setErrorMessage(null);
        try {
            let audioBlob;
            // Check if the audio needs to be generated
            if (!audioInstance || mode === "play") {
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
                if (!response.ok) {
                    const errorData = await response.json();
                    let errorMsg = "Error generating speech.";
                    if (response.status === 429) {
                        errorMsg = "Quota exceeded. Please try again later.";
                    } else if (errorData.message) {
                        errorMsg = `Error: ${errorData.message}`;
                    }
                    setErrorMessage(errorMsg);
                    setTimeout(() => setErrorMessage(null), 10000); // Hide after 10 seconds
                    throw new Error(`API Error: ${response.status} - ${JSON.stringify(errorData)}`);
                }
                audioBlob = await response.blob();
            }
            // Create or reuse the audio instance
            const audioUrl = audioBlob ? URL.createObjectURL(audioBlob) : audioInstance.src;
            const newAudio = audioBlob ? new Audio(audioUrl) : audioInstance;
            // Set playback position based on mode
            if (mode === "play") {
                newAudio.currentTime = 0; // Start from the beginning
                setAudioPausedTime(0); // Reset paused time
            } else if (mode === "continue") {
                newAudio.currentTime = audioPausedTime; // Resume from paused time
            }
            // Play the audio
            newAudio.play().then(() => {
                setIsSpeaking(true); // Set speaking state to true when audio starts playing
                setShowContinueButton(false); // Hide the "continue" button when audio starts playing
                setAudioLoading(false); // Hide loader
            }).catch((playError) => {
                console.error("Error playing audio:", playError);
                setErrorMessage("Error playing audio.");
                setTimeout(() => setErrorMessage(null), 10000);
                setIsSpeaking(false);
                setAudioLoading(false); // Hide loader
            });
            // Handle audio end event
            newAudio.onended = () => {
                setIsSpeaking(false); // Reset speaking state when audio ends
                setAudioInstance(null); // Clear the audio instance
                setAudioLoading(false); // Ensure loader is hidden
                setAudioPausedTime(0); // Reset paused time
                setShowContinueButton(false); // Hide "continue" button
            };
            // Update the audio instance
            setAudioInstance(newAudio);
        } catch (error) {
            console.error("Error generating speech:", error);
            setErrorMessage("Error playing audio");
            setTimeout(() => setErrorMessage(null), 10000);
            setIsSpeaking(false);
            setAudioLoading(false); // Hide loader in case of an error
        }
    };

    // Pagination text
    const getPaginationText = () => {
        const totalPages = totalpages();
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
                        <div className="text-center">
                            <h1 className='display-5 text-center mt-3 mb-4 text-light Scriptoria'> {title} </h1>
                            {
                                voices ?
                                    errorMessage ? <p className="error-message text-light p-2 bg-danger">{errorMessage}</p> :
                                        <div className="mb-2 text-light gap-1 d-flex align-items-center justify-content-center">
                                            <button
                                                type="button"
                                                className={`btn rounded-pill btn-${isSpeaking ? 'danger' : 'light'} btn-md`}
                                                onClick={() => {speakText("play")}}
                                                disabled={audioLoading} // Disable button while loading
                                            >
                                                {audioLoading ? (
                                                    <LoaderIcon className="my-1" />
                                                ) : isSpeaking ? (
                                                    <i className="bi bi-stop-circle-fill"></i> 
                                                ) : (
                                                    <i className="bi bi-volume-up-fill text-dark"></i> 
                                                )}
                                            </button>
                                            {showContinueButton && (
                                                <button
                                                    type="button"
                                                    className="btn btn-warning rounded-pill btn-md"
                                                    onClick={() => speakText("continue")}
                                                    disabled={audioLoading}
                                                >
                                                    <i className="bi bi-play-fill "></i>
                                                </button>
                                            )}
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
                                    : null
                            }
                        </div>
                        {/* Book */}
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
                                        <div className="page-text" key={index} dangerouslySetInnerHTML={{ __html: text }} />
                                        <div className="page-number" style={{ position: 'absolute', bottom: '5px', right: '10px', fontSize: '10px', color: '#aaa' }}>
                                            {index + 1}
                                        </div>
                                    </BookPage>
                                ))}
                            </HTMLFlipBook>
                        </div>
                        {/* pagination controls */}
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

    );
}

export default FlipBook;