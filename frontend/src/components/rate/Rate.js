import React, { useState, useEffect } from 'react'
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { sendRate, updateRate, getRate } from '../../api/rateApi'
import { toast } from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';

const Rate = ({ id, setTriggerRate }) => {

    const { t } = useTranslation()
    const { auth } = useAuth();
    const [value, setValue] = useState(0);
    const [isRated, setIsRated] = useState(false);
    const [signedIn, setSignedIn] = useState(false);
    const [button, setButton] = useState(t("Rate.save"))
    const token = auth.token
    const user = auth.userName
    const StoryId = id

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                setSignedIn(true)
                const rating = await getRate(id, token);
                if (rating !== undefined) {
                    setValue(rating);
                    setButton(t("Rate.update"))
                    setIsRated(true);
                }
            }
        };
        fetchData();
    }, []);



    const handleRating = async () => {
        if (!signedIn) return;
        const rate = {
            StoryId,
            rating: value
        };
        try {

            const res = isRated ? await updateRate(rate, token) : await sendRate(rate, token)
            if (res.statusText === 'OK')
                toast.success('you have rated this story succesfully')
            setIsRated(true);
            setTriggerRate(true)
        } catch (error) {
            console.error('Rating error:', error);
            toast.error('it looks like theres an error, try again later')
        }
    };

    return (
        <div>
            <div>
                <h4 className="my-0 mx-2" style={{ color: 'white', cursor: 'pointer', justifySelf: 'center' }} data-bs-toggle={auth?.userName ? "modal" : ""} data-bs-target={auth?.userName ? "#rateModal" : ""} onClick={() => { if (!auth?.userName) toast.error('you must be logged in to rate this story') }}>{t("Rate.header")}</h4>
                <div className="modal fade" id="rateModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="row justify-content-end mx-0">
                                <button type="button" className="btn-close m-2" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body container fs-1">
                                <div className="row star-widget row-cols-auto justify-content-center">
                                    <Rating
                                        name="hover-feedback"
                                        className='fs-1'
                                        value={value}
                                        precision={0.5}
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                        }}
                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} className='fs-1' />}
                                    />
                                </div>
                                <div className='row rate-msg fs-5 justify-content-center text-secondary'>
                                    {value ? ` ${t("Rate.msg2")} ${value}/5` : `${t("Rate.msg1")}`}
                                </div>
                            </div>
                            <div className="container gap-2 btn-group mb-2">
                                <button type="button" className="btn btn-primary rounded" data-bs-dismiss="modal" onClick={handleRating} >{button}</button>
                                <button type="button" className="btn btn-secondary rounded" data-bs-dismiss="modal">
                                    {t("Rate.cancel")}
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rate