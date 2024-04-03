import React, { useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import './FlipBook.css';
import Page from './Page.js';
import Sound from './../../../audio/PageTurn.mp3';

function splitStringIntoChunks(text, chunkSize = 150) { // Function to split a string into smaller strings chunkSize = 150 = how many words for each string
    const words = text.split(/\s+/);
    const chunks = [];
    let currentChunk = [];

    for (const word of words) {
        currentChunk.push(word);
        if (currentChunk.length >= chunkSize) {
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

    const handlePageTurn = () => {
        const audio = new Audio(Sound);
        audio.play();
    };

    const dataFromDatabase = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus mollis nibh, non convallis ex convallis eu. Suspendisse potenti. Aenean vitae pellentesque erat. Integer non tristique quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros velit viverra metus, a venenatis tellus tellus id magna. Aliquam ac nulla rhoncus, accumsan eros sed, viverra enim. Pellentesque non justo vel nibh sollicitudin pharetra suscipit ut ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus mollis nibh, non convallis ex convallis eu. Suspendisse potenti. Aenean vitae pellentesque erat. Integer non tristique quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros velit viverra metus, a venenatis tellus tellus id magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus mollis nibh, non convallis ex convallis eu. Suspendisse potenti. Aenean vitae pellentesque erat. Integer non tristique quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros velit viverra metus, a venenatis tellus tellus id magna. Aliquam ac nulla rhoncus, accumsan eros sed, viverra enim. Pellentesque non justo vel nibh sollicitudin pharetra suscipit ut ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus mollis nibh, non convallis ex convallis eu. Suspendisse potenti. Aenean vitae pellentesque erat. Integer non tristique quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros velit viverra metus, a venenatis tellus tellus id magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus mollis nibh, non convallis ex convallis eu. Suspendisse potenti. Aenean vitae pellentesque erat. Integer non tristique quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros velit viverra metus, a venenatis tellus tellus id magna. Aliquam ac nulla rhoncus, accumsan eros sed, viverra enim. Pellentesque non justo vel nibh sollicitudin pharetra suscipit ut ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus mollis nibh, non convallis ex convallis eu. Suspendisse potenti. Aenean vitae pellentesque erat. Integer non tristique quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros velit viverra metus, a venenatis tellus tellus id magna. ed, viverra enim. Pellentesque non justo vel nibh sollicitudin pharetra suscipit ut ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus mollis nibh, non convallis ex convallis eu. Suspendisse port";
    const smallerStrings = splitStringIntoChunks(dataFromDatabase);

    const nextButtonClick = () => {
        setDisplayButton(true);
        flipBookRef.current?.pageFlip()?.flipNext();
        setTimeout(() => {
            setDisplayButton(false);
        }, 1000);
    };

    const prevButtonClick = () => {
        // Function to handle previous page button click
        setDisplayButton(true);
        flipBookRef.current?.pageFlip()?.flipPrev(); //here
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


    return (
        <div className="StoryPage d-flex flex-column align-items-center justify-content-center vh-100">
            <HTMLFlipBook
                width={400}
                height={600}
                flippingTime={1000}
                mobileScrollSupport={true}
                onFlip={handlePageTurn}
                ref={flipBookRef}
            >
                {smallerStrings.map((text, index) => (
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
        </div>
    );
}

export default StoryPage;
