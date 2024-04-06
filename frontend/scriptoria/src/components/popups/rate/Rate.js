import React,  { useState, useEffect } from 'react'
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import {sendRate, updateRate, getRate} from'../../../api/rateApi'
import Cookies from 'js-cookie'
import { toast} from 'react-hot-toast';

const Rate = () => {
    const [value, setValue] = useState(0);
    const [isRated, setIsRated] = useState(false);
    const [signedIn, setSignedIn] = useState(false);
    const [button, setButton] = useState("save")
    const token = Cookies.get("token")

    useEffect(() => {
        const fetchData = async () => {
            const user = Cookies.get("userInfo");
            if(user){
                setSignedIn(true)
                const rating = await getRate('6607173031b513eec68df29d','65fb60a9334d75840746ae29', token );
                if (rating !== undefined) {
                    setValue(rating);
                    setButton("update")
                    setIsRated(true); 
                }
            }
        };
        fetchData();
    }, []);
    
    

    const handleRating = async () => {
        if (!signedIn) return;
    
        const rate = {
            StoryId: '65fb60a9334d75840746ae29',
            AccountId: '6607173031b513eec68df29d',
            rating: value
        };
    
        try {
            await toast.promise(
                isRated ? updateRate(rate.AccountId, rate, token) : sendRate(rate, token),
                {
                    loading: 'Submitting rating...',
                    success: isRated ? 'Your rating has been updated successfully.' : 'Thank you for rating! Your rating has been successfully submitted.',
                    error: 'Failed to save your rating. Please try again later.',
                }
            );
    
            setIsRated(true);
        } catch (error) {
            console.error('Rating error:', error);
        }
    };

    return (
        <div>
            <div>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Rate
                </button>
                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                <div className='row fs-5 justify-content-center'>
                                    {value ? `You rated this story ${value}/5` : 'Rate this story'}
                                </div>
                            </div>

                            <div className="container gap-2 btn-group mb-2">
                                <button type="button" className="btn btn-primary rounded" data-bs-dismiss="modal" onClick={handleRating} >{button}</button>
                                <button type="button" className="btn btn-secondary rounded" data-bs-dismiss="modal">
                                    cancel
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