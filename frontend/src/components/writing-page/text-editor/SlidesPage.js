import React, { useEffect, useState, useRef } from 'react';
import { PlusCircle, Trash2, ChevronLeft, Loader, ChevronRight } from 'lucide-react';
import TextEditor from './TextEditor';
import { useNavigate, useParams } from "react-router-dom";
import useSlide from "../../../hooks/useSlides";
import toast from "react-hot-toast";

const MAX_CHARS = 1560;

const SlidesPage = ({ socket, focus }) => {
    const [slides, setSlides] = useState([]);
    const containerRef = useRef(null);
    const { id: documentId } = useParams();
    const { addSlide, deleteSlide } = useSlide(documentId);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [deleteFlag, setDeleteFlag] = useState(false);

    const [isProcessing, setIsProcessing] = useState(false);
    const [lastActionTime, setLastActionTime] = useState(0);

    const navigate = useNavigate()


    const centerSlide = (index) => {
        if (!containerRef.current || !slides.length) return;

        const container = containerRef.current;
        const slideElement = container.children[index];

        if (!slideElement) return;

        const containerWidth = container.offsetWidth;
        const slideWidth = slideElement.offsetWidth;
        const slideLeft = slideElement.offsetLeft;

        const scrollTo = slideLeft - (containerWidth / 2) + (slideWidth / 2);

        container.scrollTo({
            left: scrollTo,
            behavior: 'smooth'
        });
    };

    const goToSlide = (index) => {
        if (index < 0 || index >= slides.length) return;
        setCurrentSlideIndex(index);
        centerSlide(index);
    };

    useEffect(() => {
        if (socket == null) return;

        socket.emit("get-document", documentId);

        socket.once("load-document", document => {
            if (!document) {
                navigate('/NoAccessPage')
            }
            setSlides(document);
            setCurrentSlideIndex(0);
        });
    }, [socket, documentId]);

    useEffect(() => {
        if (socket == null) return;

        socket.on("get-add-slide", (slide) => {
            setSlides(prev => [...prev, slide]);
            toast("New slide was added");
        });
    }, [socket, documentId]);

    useEffect(() => {
        if (socket == null) return;

        socket.on("get-slide-after-delete", (slide) => {
            setSlides(prev => [...slide]);
            setDeleteFlag(!deleteFlag)
            setCurrentSlideIndex(prev => Math.min(prev, slide.length - 1));
            toast("The slide was deleted");
        });
    }, [socket, documentId]);

    const handleAddSlide = async () => {
        const now = Date.now();
        const timeSinceLastAction = now - lastActionTime;

        if (isProcessing || timeSinceLastAction < 500) return;

        setIsProcessing(true);

        const lastSlide = slides[slides.length - 1];
        if (!lastSlide || lastSlide.text.replace(/<[^>]*>/g, '').trim().length > 0) {
            const newSlide = await addSlide();
            setCurrentSlideIndex(slides.length - 1);
            socket.emit("add-slide", newSlide);

            setTimeout(() => {
                setIsProcessing(false);
                setLastActionTime(Date.now());
            }, 500);

            return;
        }
        toast("The last slide must have a content");
        return;
    };

    const handleDeleteSlide = async (index) => {
        if (isProcessing) return;

        if (slides.length > 1 && !window.confirm("Are you sure you want to delete this page?")) {
            return;
        }

        setIsProcessing(true);

        const newSlide = await deleteSlide(index);
        setSlides(prev => [...newSlide]);
        socket.emit("delete-slide", newSlide);

        setTimeout(() => {
            setIsProcessing(false);
            setLastActionTime(Date.now());
        }, 500);
    };

    useEffect(() => {
        if (slides.length > 0) {
            centerSlide(currentSlideIndex);
        }
    }, [slides, currentSlideIndex]);

    return (
        <div className="container">
            <div className="position-relative">
                {currentSlideIndex > 0 && slides.length > 1 && (
                    <button
                        onClick={() => goToSlide(currentSlideIndex - 1)}
                        className="btn btn-light position-absolute start-0 top-50 translate-middle-y z-3 rounded-circle shadow-sm border"
                        style={{ width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ChevronLeft size={20} />
                    </button>
                )}

                <div
                    ref={containerRef}
                    className="d-flex overflow-auto"
                    style={{
                        scrollSnapType: 'x mandatory',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                >
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 mx-2"
                            style={{
                                width: '100%',
                                scrollSnapAlign: 'center',
                                transition: 'transform 0.3s ease',
                                transform: index === currentSlideIndex ? 'scale(1.02)' : 'scale(1)'
                            }}
                        >
                            <div
                                className={`rounded  p-4 ${index === currentSlideIndex ? 'shadow-lg' : 'shadow'}`}
                                style={{ minHeight: '600px' }}
                            >
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <div className="text-muted fst-italic">
                                        <p className={`${focus ? "text-light" : ""} m-0`}>Page {index + 1} of {slides.length}</p>
                                    </div>

                                    <div className="d-flex align-items-center">
                                        <small className="text-muted me-3">
                                            <p className={`${focus ? "text-light" : ""} m-0`}>
                                                {slides[index]?.text.replace(/<[^>]*>/g, '').length}/{MAX_CHARS} characters
                                            </p>
                                        </small>
                                        {index === slides.length - 1 && slide?.text.replace(/<[^>]*>/g, '').trim().length > 0 && <button
                                            onClick={handleAddSlide}
                                            className="btn btn-sm btn-outline-secondary border-0 mx-1"
                                            title="Add new page"
                                        >
                                            {!isProcessing ? <PlusCircle size={18} className={`${focus ? "text-light" : ""} m-0`} /> : <Loader className="m-0" size={18} style={{ animation: 'spin 1s linear infinite' }} />}
                                        </button>}
                                        <button
                                            onClick={() => handleDeleteSlide(index)}
                                            className="btn btn-sm btn-outline-danger border-0 mx-1"
                                            title="Delete this page"
                                            disabled={slides.length <= 1}
                                        >
                                            {!isProcessing ? <Trash2 size={18} /> : <Loader className="m-0" size={18} style={{ animation: 'spin 1s linear infinite' }} />}
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-4 bg-white" style={{ borderRadius: '10px', overflow: 'hidden' }}>
                                    <TextEditor
                                        key={`${slide._id}-${deleteFlag}`}
                                        socket={socket}
                                        slide={slide}
                                        index={index}
                                        setSlides={setSlides}
                                        documentId={documentId}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {currentSlideIndex < slides.length - 1 && slides.length > 1 && (
                    <button
                        onClick={() => goToSlide(currentSlideIndex + 1)}
                        className="btn btn-light position-absolute end-0 top-50 translate-middle-y z-3 rounded-circle shadow-sm border"
                        style={{ width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ChevronRight size={20} />
                    </button>
                )}
            </div>
            {slides.length > 1 && (
                <div className="d-flex justify-content-center mt-4 pb-3">
                    <button
                        onClick={() => goToSlide(0)}
                        className="btn btn-sm mx-1"
                    >
                        <p className={`${focus ? "text-light" : ""} m-0`}>« Start</p>
                    </button>
                    {(() => {
                        const buttons = [];
                        const totalSlides = slides.length;
                        const maxVisible = 5;

                        if (totalSlides <= maxVisible) {
                            for (let i = 0; i < totalSlides; i++) {
                                buttons.push(
                                    <button
                                        key={i}
                                        onClick={() => goToSlide(i)}
                                        className={`btn btn-sm mx-1 rounded-circle ${i === currentSlideIndex ? 'btn-primary' : 'btn-outline-secondary'}`}
                                        style={{ width: '30px', height: '30px', padding: 0 }}
                                    >
                                        {i + 1}
                                    </button>
                                );
                            }
                        } else {
                            let start = Math.max(0, currentSlideIndex - 2);
                            let end = start + maxVisible;

                            if (end > totalSlides) {
                                end = totalSlides;
                                start = end - maxVisible;
                            }

                            for (let i = start; i < end; i++) {
                                buttons.push(
                                    <button
                                        key={i}
                                        onClick={() => goToSlide(i)}
                                        className={`btn btn-sm mx-1 rounded-circle ${i === currentSlideIndex ? 'btn-primary' : 'btn-outline-secondary'}`}
                                        style={{ width: '30px', height: '30px', padding: 0 }}
                                    >
                                        {i + 1}
                                    </button>
                                );
                            }
                        }

                        return buttons;
                    })()}
                    <button
                        onClick={() => goToSlide(slides.length - 1)}
                        className="btn btn-sm mx-1"
                    >
                        <p className={`${focus ? "text-light" : ""} m-0`}>End »</p>
                    </button>
                </div>
            )}
        </div>
    );
};

export default SlidesPage;

