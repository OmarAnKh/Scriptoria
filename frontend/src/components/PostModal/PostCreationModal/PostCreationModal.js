import React, { useState, useRef, useCallback, useEffect } from 'react';
import { X, Users, Send, Image, AlertCircle } from 'lucide-react';
import MediaUploader from './MediaUploader';
import ConfirmationDialog from '../ConfirmationDialog';
import { uploadFile } from '../../../lib/firebase.js';
import { createPost, deletePost, updatePost } from '../../../api/postApi.js';
import toast from 'react-hot-toast';


const MAX_MEDIA_COUNT = 3;

const PostCreationModal = ({ isOpen, onClose, currentUser }) => {
    const [content, setContent] = useState('');
    const [media, setMedia] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [post, setPost] = useState({});
    const contentRef = useRef(null);

    // Initialize a new post when modal opens
    useEffect(() => {
        if (isOpen && contentRef.current) {
            contentRef.current.focus();
            initializeNewPost();
        }
    }, [isOpen]);

    // Function to initialize a new post
    const initializeNewPost = async () => {
        try {
            const postDocument = {
                content: "",
                media: "",
                author: currentUser._id
            };
            const createPostResponse = await createPost(postDocument);
            setPost(createPostResponse.post);
        } catch (error) {
            console.error('Error creating initial post:', error);
            toast.error('Something went wrong. Please try again.');
        }
    };

    // Reset form state
    const resetForm = () => {
        setContent('');
        setMedia([]);
        setIsSubmitting(false);
    };

    const handleAddMedia = useCallback((newMedia) => {
        setMedia(prev => {
            // Calculate how many more items we can add without exceeding MAX_MEDIA_COUNT
            const remainingSlots = MAX_MEDIA_COUNT - prev.length;

            // If we don't have any slots remaining, show a toast and return current media
            if (remainingSlots <= 0) {
                toast.error(`You can only upload up to ${MAX_MEDIA_COUNT} images`);
                return prev;
            }

            // Determine how many items to take from newMedia
            const itemsToAdd = newMedia.slice(0, remainingSlots);

            // If we couldn't add all items, show a toast
            if (itemsToAdd.length < newMedia.length) {
                toast.error(`Only added ${itemsToAdd.length} images. Maximum of ${MAX_MEDIA_COUNT} images allowed.`);
            }

            return [...prev, ...itemsToAdd];
        });
    }, []);

    const handleRemoveMedia = useCallback((index) => {
        setMedia(prev => prev.filter((_, i) => i !== index));
    }, []);

    const handleSubmit = async () => {
        if (!content.trim() && !media.length) return;

        try {
            setIsSubmitting(true);

            // Upload all media to Firebase
            if (media.length > 0) {
                await Promise.all(
                    media.map(item => uploadFile(item.file, post?._id))
                );
            }

            const postPayload = {
                id: post._id,
                content,
                media: media.length > 0 ? `/posts/${post?._id}` : "",
            };

            const updatePostResponse = await updatePost(postPayload);

            if (updatePostResponse.state === true) {
                toast.success("Post created successfully");

                // Close modal and reset form
                handleClose(true);

                resetForm();
            } else {
                toast.error("Failed to create post");
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error('Error submitting post:', error);
            toast.error("Something went wrong. Please try again.");
            setIsSubmitting(false);
        }
    };

    const handleClose = async (force = false) => {
        if (force) {
            resetForm();
            onClose();
            return;
        }
        if (content.trim() || media.length > 0) {
            setShowConfirmation(true);
        } else {
            const deletePostResponse = await deletePost(post._id);
            resetForm();
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1050 }}
            onClick={(e) => {
                if (e.target === e.currentTarget) handleClose();
            }}
        >
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <button
                            onClick={() => handleClose()}
                            className="btn-close"
                            aria-label="Close"
                        ></button>
                        <h5 className="modal-title position-absolute start-50 translate-middle-x">Create Post</h5>
                    </div>

                    <div className="modal-body p-0">
                        <div className="p-3">
                            <div className="d-flex align-items-center gap-3">
                                {currentUser?.profilePicture ? (
                                    <img
                                        src={`data:image/png;base64,${currentUser?.profilePicture}`}
                                        alt={currentUser.displayName}
                                        style={{ width: '48px', height: '48px' }}
                                        className="avatar rounded-circle"
                                    />
                                ) : (
                                    <div
                                        className="avatar rounded-circle bg-light d-flex align-items-center justify-content-center"
                                        style={{ width: '48px', height: '48px' }}
                                    >
                                        <span className="text-muted fw-bold">{currentUser?.displayName?.charAt(0)}</span>
                                    </div>
                                )}

                                <div>
                                    <p className="fw-semibold mb-1">{currentUser?.displayName}</p>
                                    <div>
                                        <button className="btn btn-light btn-sm d-flex align-items-center gap-2 ">
                                            <Users size={16} />
                                            <span>Public</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-3">
                            <textarea
                                ref={contentRef}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder={`What's on your mind, ${currentUser?.displayName}?`}
                                className="form-control border-0 post-content"
                                disabled={isSubmitting}
                                style={{
                                    minHeight: '100px',
                                    maxHeight: '200px',
                                    overflowY: 'auto',
                                    resize: 'none'
                                }}
                            />

                            {media.length > 0 && (
                                <div className="mt-3">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <p className="small text-muted mb-0">Media Preview</p>
                                        <span className="badge bg-primary">
                                            {media.length}/{MAX_MEDIA_COUNT} images
                                        </span>
                                    </div>
                                    <div className="row g-2">
                                        {media.map((item, index) => (
                                            <div key={index} className="col-md-4 col-6">
                                                <div className="position-relative">
                                                    <div className="media-preview-container" style={{
                                                        height: '150px',
                                                        overflow: 'hidden',
                                                        borderRadius: '8px',
                                                        backgroundColor: '#f8f9fa'
                                                    }}>
                                                        <img
                                                            src={item.previewUrl}
                                                            alt="Media preview"
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: 'cover'
                                                            }}
                                                        />
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemoveMedia(index)}
                                                        className="btn btn-dark btn-sm position-absolute top-0 end-0 m-2 rounded-circle p-1"
                                                        disabled={isSubmitting}
                                                        aria-label="Remove media"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-3 border-top">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <p className="fw-semibold small mb-0">Add to your post</p>
                                {media.length >= MAX_MEDIA_COUNT && (
                                    <span className="text-danger small d-flex align-items-center">
                                        <AlertCircle size={14} className="me-1" />
                                        Maximum images reached
                                    </span>
                                )}
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <MediaUploader
                                    onAddMedia={handleAddMedia}
                                    disabled={isSubmitting || media.length >= MAX_MEDIA_COUNT}
                                >
                                    <button
                                        className={`btn ${media.length >= MAX_MEDIA_COUNT ? 'btn-secondary' : 'btn-primary'} rounded-circle p-2`}
                                        disabled={isSubmitting || media.length >= MAX_MEDIA_COUNT}
                                        aria-label="Add media"
                                        title={media.length >= MAX_MEDIA_COUNT ? `Maximum ${MAX_MEDIA_COUNT} images allowed` : "Add images"}
                                    >
                                        <Image size={20} />
                                    </button>
                                </MediaUploader>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting || (!content.trim() && !media.length)}
                            className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                        >
                            {isSubmitting ? (
                                <div className="spinner-border spinner-border-sm me-2"></div>
                            ) : (
                                <Send size={20} />
                            )}
                            Post
                        </button>
                    </div>
                </div>
            </div>

            <ConfirmationDialog
                isOpen={showConfirmation}
                onClose={()=>setShowConfirmation(false)}
                onConfirm={async () => {
                    resetForm();
                    onClose();
                    setShowConfirmation(false);
                    const deletePostResponse = await deletePost(post._id)
                }}
                title="Discard post?"
                message="If you leave, your post will be discarded. Are you sure you want to exit?"
                confirmText="Discard"
                cancelText="Continue editing"
            />
        </div>
    );
};

export default PostCreationModal;