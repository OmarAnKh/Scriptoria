import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import HTMLFlipBook from 'react-pageflip';
import './FlipBook.css';
import Page from './Page.js';
import Sound from './../../../audio/PageTurn.mp3';
import Icons from "../../story-header/icons/Icons.js"
import { getstory } from "../../../api/storyAPI.js"
import Navbar from "../../navbar/Navbar";
import useSlide from "../../../hooks/useSlide.js"

const formatText = (object) => {
    let formattedArray = [];
    for (let key in object) {
        if (typeof object[key] === 'string') {
            let tempString = '';
            if (object.attributes) {
                const { bold, italic, underline } = object.attributes;
                if (bold) {
                    tempString += '<b>';
                }
                if (italic) {
                    tempString += '<i>';
                }
                if (underline) {
                    tempString += '<u>';
                }
            }
            tempString += object[key];
            if (object.attributes) {
                const { bold, italic, underline } = object.attributes;
                if (bold) {
                    tempString += '</b>';
                }
                if (italic) {
                    tempString += '</i>';
                }
                if (underline) {
                    tempString += '</u>';
                }
            }

            formattedArray.push(tempString);
        } else if (typeof object[key] === 'object') {
            formattedArray = formattedArray.concat(formatText(object[key]));
        }
    }
    return formattedArray;
};




function splitString(str, size) {
    const substrings = [];
    let start = 0;

    while (start < str.length) {
        let end = start + size;

        // Check if the end position is within the string length
        if (end >= str.length) {
            substrings.push(str.slice(start)); // Push the remaining part of the string
            break;
        }

        // Find the nearest space character from the end position
        while (str[end] !== ' ' && end > start) {
            end--;
        }

        if (end === start) {
            // If no space found, split at the end position
            substrings.push(str.slice(start, start + size));
            start += size;
        } else {
            // Split at the nearest space character
            substrings.push(str.slice(start, end));
            start = end + 1; // Move start position after the space
        }
    }

    return substrings;
}
const splitBigArrays = (object, characters) => {
    let tempArray = []
    let tempstring = ''
    let tempsubstring = ''
    for (let i = 0; i < object.length; i++) {
        if (object[i].includes('<b>') || object[i].includes('<u>') || object[i].includes('<i>')) {
            tempArray.push(object[i])
        } else {
            tempsubstring = splitString(object[i], characters)
            for (let i = 0; i < tempsubstring.length; i++) {
                tempArray.push(tempsubstring[i])
            }
        }
    }
    console.log(tempArray)
    return tempArray
}

// const formatText = (object) => {
//     let formattedArray = [];

//     for (let key in object) {
//         if (typeof object[key] === 'string') {
//             let tempString = '';
//             if (object.attributes) {
//                 const { bold, italic, underline } = object.attributes;
//                 if (bold) {
//                     tempString += '<b>';
//                 }
//                 if (italic) {
//                     tempString += '<i>';
//                 }
//                 if (underline) {
//                     tempString += '<u>';
//                 }
//             }
//             tempString += object[key];
//             if (object.attributes) {
//                 const { bold, italic, underline } = object.attributes;
//                 if (bold) {
//                     tempString += '</b>';
//                 }
//                 if (italic) {
//                     tempString += '</i>';
//                 }
//                 if (underline) {
//                     tempString += '</u>';
//                 }
//             }
//             formattedArray.push(tempString);
//         } else if (typeof object[key] === 'object') {
//            
//         }
//     }
//     return formattedArray;
// };

// const splitText = (object, characters) => {
//     let tempArray = [];
//     let tempstring = '';

//     let size = characters;


//     for (let i = 0; i < object.length; i++) {
//         if (object[i].includes('\n')) {
//             object[i] = object[i].replaceAll('\n', '')
//         }
//     }
//     for (let key in object) {
//         if (object.hasOwnProperty(key)) {
//             if (object[key].length <= size) {

//                 tempstring += object[key];
//                 size -= object[key].length;

//             } else {
//                 tempArray.push(tempstring);
//                 tempstring = '';

//                 if (object[key].length > characters) {
//                     tempArray.push(object[key]);
//                 } else {
//                     tempstring = object[key];
//                     size = characters - object[key].length;
//                 }
//             }
//         }
//     }
//     if (tempstring !== '') {
//         tempArray.push(tempstring);
//     }

//     return tempArray;
// }

// const divIntoSubArrays = (object, characters) => {

//     let slides = []
//     let tempstring = ''
//     for (let textIndex = 0; textIndex < object.length; textIndex++) {
//         if (tempstring.length < characters) {
//             tempstring += object[textIndex]
//             console.log(tempstring, 5000 ,tempstring.length)
//         }
//         if (tempstring.length > characters) {
//             console.log(tempstring, 1000)
//             slides.push(tempstring)
//             tempstring = ''
//         }
//     }
//     console.log(slides)
//     return slides
// }




function StoryPage(props) {
    const [displayButton, setDisplayButton] = useState(false);
    const flipBookRef = useRef(null);
    const { id } = useParams();
    const [storyData, setStoryData] = useState(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [bookWidth, setBookWidth] = useState(400);
    const [howManyWords, setHowManyWords] = useState(500)
    const [howManycharacters, setWowManycharacters] = useState(1000)
    const [data, setData] = useState({})
    const [counts, setCounts] = useState({})
    const [formattedText, setFormattedText] = useState('');
    const [splittext, setSplitText] = useState([])
    // const slide = useSlide(formattedText, howManycharacters)

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
            // setHowManyWords(windowWidth - 40)
        } else {
            setBookWidth(0);
            // setHowManyWords(65)
        }
    }, [windowWidth]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const story = await getstory(id);
                setStoryData(story);
                setCounts(story.counts)
                const temptext = formatText(story?.story?.slide?.ops);
                for (let i = 0; i < temptext.length; i++) {
                    if (typeof temptext[i] === 'string' && temptext[i].includes('\n')) {
                        temptext[i] = temptext[i].replaceAll('\n', '');
                    }
                }

                setFormattedText(splitBigArrays(temptext, 100));
                console.log(formattedText)



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

    // const formattedTextArray = splitText(formattedText, howManyWords)
    // divIntoSubArrays(formattedTextArray, howManycharacters)
    // console.log(formattedTextArray)
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
                    {/* {formattedTextArray && formattedTextArray.map((text, index) => (
                        <Page>
                            <div key={index} dangerouslySetInnerHTML={{ __html: text }}></div>
                        </Page>
                    ))} */}
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
