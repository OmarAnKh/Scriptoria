import React, { useEffect, useState } from 'react';
import { UserCircle2, AlertTriangle, Check, X } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { getInvitation, invitationResponse } from '../../api/writers';
import useAuth from '../../hooks/useAuth';
import useAccount from '../../hooks/useAccount';
import { getstory } from '../../api/storyAPI';

const AcceptInvitation = () => {
    const { auth } = useAuth();
    const { getAccountById } = useAccount();
    const { invitationId } = useParams();
    const navigate = useNavigate();
    const [invitationData, setInvitationData] = useState({});
    const [storyData, setStoryData] = useState({});
    const [invitationSenderData, setInvitationSenderData] = useState({});
    const [isValidRecipient, setIsValidRecipient] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [actionTaken, setActionTaken] = useState(false);
    const [responseStatus, setResponseStatus] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const invitationData = await getInvitation(invitationId);
                setInvitationData(invitationData);

                setIsValidRecipient(auth?.userInfo?._id === invitationData?.invitation?.AccountId);

                if (invitationData?.invitation?.senderId) {
                    const senderData = await getAccountById(invitationData.invitation.senderId);
                    setInvitationSenderData(senderData);
                }

                if (invitationData?.invitation?.StoryId) {
                    const storyData = await getstory(invitationData.invitation.StoryId);
                    setStoryData(storyData);
                }

                // Set initial status if already responded
                if (invitationData?.invitation?.invitationStatus === 'accepted' ||
                    invitationData?.invitation?.invitationStatus === 'rejected') {
                    setActionTaken(true);
                    setResponseStatus(invitationData.invitation.invitationStatus);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [auth?.userInfo?._id, invitationId]);

    const handleInvitationResponse = async (status) => {
        try {
            // Immediately set action taken and response status
            setActionTaken(true);
            setResponseStatus(status);

            const response = await invitationResponse(invitationId, status);
            if (response.state) {
                setInvitationData((prev) => ({
                    ...prev,
                    invitation: {
                        ...prev.invitation,
                        invitationStatus: status,
                    },
                }));

                // Redirect after 2 seconds if accepted
                if (status === 'accepted') {
                    setTimeout(() => {
                        navigate(`/WritingPage/${invitationData?.invitation?.StoryId}`);
                    }, 2000);
                }
            } else {
                alert(response.message || 'Something went wrong!');
            }
        } catch (error) {
            console.error('Error handling invitation:', error);
        }
    };

    if (isLoading) {
        return (
            <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!isValidRecipient) {
        return (
            <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center p-4">
                <div className="card shadow-sm text-center" style={{ maxWidth: '400px' }}>
                    <div className="card-body p-4">
                        <AlertTriangle size={48} className="text-warning mb-3" />
                        <h2 className="h4 mb-3">Invalid Invitation</h2>
                        <p className="text-muted">This invitation was not sent to your account. Please check the invitation link or sign in with the correct account.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center p-4">
            <div className="card shadow-sm text-center" style={{ maxWidth: '400px' }}>
                <div className="card-body p-4">
                    {/* Avatar */}
                    <div className="d-flex justify-content-center mb-4">
                        <div className="bg-light rounded-circle p-2">
                            {invitationSenderData?.user?.profilePicture ? (
                                <img
                                    src={`data:image/png;base64,${invitationSenderData.user.profilePicture}`}
                                    alt="Sender Profile"
                                    className="rounded-circle"
                                    style={{ width: 80, height: 80, objectFit: 'cover' }}
                                />
                            ) : (
                                <UserCircle2 size={80} className="text-secondary" />
                            )}
                        </div>
                    </div>

                    {/* User Info */}
                    <h2 className="h4 mb-1">{invitationSenderData.user?.displayName}</h2>
                    <span className="text-muted d-block mb-2">{invitationSenderData.user?.email}</span>
                    <p className="text-muted mb-4">Wants to collaborate on a story</p>

                    {/* Invitation Text */}
                    <div className="mb-4">
                        <span className="text-success fw-medium">Accept the invite</span>
                        <span className="text-muted"> to become a collaborator on the story</span>
                        <h3 className="fw-medium mt-1 mb-0">{storyData.story?.title}</h3>
                        <p className="text-muted small mt-2">Role: {invitationData?.invitation?.rule}</p>
                    </div>

                    {/* Always show action result or buttons */}
                    <div className="text-center">
                        {actionTaken ? (
                            responseStatus === 'accepted' ? (
                                <div className="alert alert-success d-flex align-items-center justify-content-center gap-2">
                                    <Check size={24} />
                                    <span>Invitation Accepted!</span>
                                </div>
                            ) : (
                                <div className="alert alert-danger d-flex align-items-center justify-content-center gap-2">
                                    <X size={24} />
                                    <span>Invitation Rejected</span>
                                </div>
                            )
                        ) : (
                            <>
                                {/* Accept Button */}
                                <button
                                    className="btn btn-success w-100 mb-2"
                                    onClick={() => handleInvitationResponse('accepted')}
                                >
                                    ACCEPT INVITE
                                </button>

                                {/* Reject Button */}
                                <button
                                    className="btn btn-danger w-100"
                                    onClick={() => handleInvitationResponse('rejected')}
                                >
                                    REJECT INVITE
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AcceptInvitation;