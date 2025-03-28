import React, { useEffect, useState, useRef } from 'react';
import { PlusCircle, Trash2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import TextEditor from './TextEditor';
import { useParams } from "react-router-dom";
import useSlide from "../../../hooks/useSlides";
import toast from "react-hot-toast";

const MAX_CHARS = 1560;

const SlidesPage = ({ socket }) => {
    const [slides, setSlides] = useState([]);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [activeUsers, setActiveUsers] = useState({});
    const containerRef = useRef(null);
    const textareaRefs = useRef({});
    const { id: documentId } = useParams();
    const { addSlide, deleteSlide } = useSlide(documentId);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

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
            setCurrentSlideIndex(prev => prev + 1);
            toast("New slide was added");
        });
    }, [socket, documentId]);

    useEffect(() => {
        if (socket == null) return;

        socket.on("get-slide-after-delete", (slide) => {
            setSlides(prev => [...slide]);
            setCurrentSlideIndex(prev => Math.min(prev, slide.length - 1));
        });
    }, [socket, documentId]);

    const handleAddSlide = async () => {
        const lastSlide = slides[slides.length - 1];
        if (!lastSlide || lastSlide.text.trim().length > 0) {
            const newSlide = await addSlide();
            socket.emit("add-slide", newSlide);
            return;
        }
        toast("The last slide must have a content");
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
        <div className="mb-4">
            <div className="position-relative">
                <button
                    onClick={() => goToSlide(currentSlideIndex - 1)}
                    disabled={currentSlideIndex === 0}
                    className="btn btn-light position-absolute start-0 top-50 translate-middle-y rounded-circle z-3 bg-white bg-opacity-75"
                    style={{ padding: '0.5rem' }}
                >
                    <ChevronLeft size={24} />
                </button>

                <div
                    ref={containerRef}
                    className="d-flex overflow-auto pb-4 px-5 hide-scrollbar"
                    style={{
                        scrollSnapType: 'x mandatory',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`flex-shrink-0 mx-2 ${index % 2 === 0 ? 'book-page-left' : 'book-page-right'}`}
                            style={{
                                width: '800px',
                                scrollSnapAlign: 'center',
                                transition: 'transform 0.3s ease',
                                transform: index === currentSlideIndex ? 'scale(1.02)' : 'scale(1)'
                            }}
                        >
                            <div className="position-relative bg-white rounded shadow p-4" style={{ minHeight: '600px' }}>
                                <div className="position-absolute top-0 end-0 p-3 d-flex align-items-center">
                                    <span className="text-muted small me-3">
                                        Page {index + 1} • {slide?.text.replace(/<[^>]*>/g, '').length}/{MAX_CHARS}
                                    </span>
                                    <button
                                        onClick={handleAddSlide}
                                        className="btn btn-link p-0"
                                    >
                                        <PlusCircle size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteSlide(index)}
                                        className="btn btn-link text-danger p-0"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>

                                <div className="mt-4">
                                    {activeUsers[slide?._id]?.length > 0 && (
                                        <div className="d-flex flex-wrap gap-2 mb-3">
                                            {activeUsers[slide?._id].map((user, i) => (
                                                <div
                                                    key={i}
                                                    className="px-3 py-1 rounded-pill small"
                                                    style={{ backgroundColor: user.color + '20', color: user.color }}
                                                >
                                                    {user.name} is editing...
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <TextEditor
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
                    className="btn btn-light position-absolute end-0 top-50 translate-middle-y z-3 rounded-circle bg-white bg-opacity-75"
                    style={{ padding: '0.5rem' }}
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
};

export default SlidesPage;

