import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import PostCreationModal from './PostCreationModal/PostCreationModal';
import useAuth from '../../hooks/useAuth';

const WritePost = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { auth } = useAuth()

    if (auth?.userInfo) {
        return (
            <div>
                <main className="py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-8">
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <div className="d-flex gap-3 align-items-center">
                                            <img
                                                className="avatar rounded-circle"
                                                src={`data:image/png;base64,${auth?.userInfo?.profilePicture}`}
                                                alt={auth?.userInfo?.displayName}
                                                style={{ width: '60px', height: '60px' }} // Small size for profile picture
                                            />
                                            <button
                                                onClick={() => setIsModalOpen(true)}
                                                className="btn btn-light rounded-pill flex-grow-1 text-start p-3"
                                            >
                                                What's on your mind, {auth?.userInfo?.displayName}?
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <PostCreationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    currentUser={auth?.userInfo}
                />
            </div>
        )
    }
    else {
        return (
            <div></div>
        )
    }
};

export default WritePost;
