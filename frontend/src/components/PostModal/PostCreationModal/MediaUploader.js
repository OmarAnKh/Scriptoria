import React, { useRef } from 'react';
import { Image } from 'lucide-react';

const MediaUploader = ({ onAddMedia, disabled, children }) => {
    const fileInputRef = useRef(null);

    const handleClick = () => {
        if (!disabled && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const mediaFiles = files.map(file => {
            // Create a preview URL for the file
            const previewUrl = URL.createObjectURL(file);
            return { file, previewUrl };
        });

        onAddMedia(mediaFiles);

        // Reset the input so the same file can be selected again
        e.target.value = '';
    };

    return (
        <div onClick={handleClick} style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}>
            {children || (
                <button
                    className="btn btn-light rounded-circle p-2"
                    disabled={disabled}
                    type="button"
                    aria-label="Add media"
                >
                    <Image size={20} />
                </button>
            )}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                multiple
                style={{ display: 'none' }}
                disabled={disabled}
            />
        </div>
    );
};

export default MediaUploader;