import { React, useEffect } from 'react';

const ConfirmationDialog = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel'
}) => {

    if (!isOpen) return null;

    return (
        <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1060 // Higher than the parent modal
            }}
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <p>{message}</p>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            {cancelText}
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={onConfirm}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;