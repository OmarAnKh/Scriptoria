import React, { useEffect, useState, useRef } from 'react';
import { PlusCircle, Trash2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import TextEditor from './TextEditor';
import { useParams } from "react-router-dom";
import useSlide from "../../../hooks/useSlides";
import toast from "react-hot-toast";

const MAX_CHARS = 1560;

const SlidesPage = ({ socket }) => {
    const [slides, setSlides] = useState([]);
    const containerRef = useRef(null);
    const { id: documentId } = useParams();
    const { addSlide, deleteSlide } = useSlide(documentId);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [deleteFlag, setDeleteFlag] = useState(false);

    // Center the current slide
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

    // Handle navigation
    const goToSlide = (index) => {
        if (index < 0 || index >= slides.length) return;
        setCurrentSlideIndex(index);
        centerSlide(index);
    };

    // Original socket effects
    useEffect(() => {
        if (socket == null) return;

        socket.once("load-document", document => {
            setSlides(document);
            setCurrentSlideIndex(0);
        });

        socket.emit("get-document", documentId);
    }, [socket, documentId]);

    useEffect(() => {
        if (socket == null) return;

        socket.on("get-add-slide", (slide) => {
            setSlides(prev => [...prev, slide]);
            // setCurrentSlideIndex(slides.length + 1);
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
        const lastSlide = slides[slides.length - 1];
        if (!lastSlide || lastSlide.text.replace(/<[^>]*>/g, '').trim().length > 0) {
            const newSlide = await addSlide();
            // setCurrentSlideIndex(slides.length + 1);
            socket.emit("add-slide", newSlide);
            return;
        }
        toast("The last slide must have a content");
        return;
    };

    const handleDeleteSlide = async (index) => {
        const newSlide = await deleteSlide(index);
        socket.emit("delete-slide", newSlide);
    };

    useEffect(() => {
        if (slides.length > 0) {
            centerSlide(currentSlideIndex);
        }
    }, [slides, currentSlideIndex]);

    return (
        <div>
            <div className="container">
                <div className="position-relative">
                    <button
                        onClick={() => goToSlide(currentSlideIndex - 1)}
                        disabled={currentSlideIndex === 0}
                        className="btn btn-light position-absolute start-0 top-50 translate-middle-y z-3 rounded-circle shadow-sm border"
                        style={{ width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ChevronLeft size={20} />
                    </button>

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
                                            Page {index + 1} of {slides.length}
                                        </div>

                                        <div className="d-flex align-items-center">
                                            <small className="text-muted me-3">
                                                {slides[index]?.text.replace(/<[^>]*>/g, '').length}/{MAX_CHARS} characters
                                            </small>
                                            {index === slides.length - 1 && slide?.text.replace(/<[^>]*>/g, '').trim().length > 0 && <button
                                                onClick={handleAddSlide}
                                                className="btn btn-sm btn-outline-secondary border-0 mx-1"
                                                title="Add new page"
                                            >
                                                <PlusCircle size={18} />
                                            </button>}
                                            <button
                                                onClick={() => handleDeleteSlide(index)}
                                                className="btn btn-sm btn-outline-danger border-0 mx-1"
                                                title="Delete this page"
                                                disabled={slides.length <= 1}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-4 bg-white">
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
                    <button
                        onClick={() => goToSlide(currentSlideIndex + 1)}
                        disabled={currentSlideIndex === slides.length - 1}
                        className="btn btn-light position-absolute end-0 top-50 translate-middle-y z-3 rounded-circle shadow-sm border"
                        style={{ width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>

                <div className="d-flex justify-content-center mt-4 pb-3">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`btn btn-sm mx-1 rounded-circle ${index === currentSlideIndex ? 'btn-primary' : 'btn-outline-secondary'}`}
                            style={{ width: '30px', height: '30px', padding: 0 }}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SlidesPage;

