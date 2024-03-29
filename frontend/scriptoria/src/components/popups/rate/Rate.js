import React,  { useState } from 'react'
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import {sendRate} from'../../../api/rateApi'

const Rate = () => {
    const [value, setValue] = useState(0);
    const [hover, setHover] = useState(-1);
    const [message, setMessage] = useState(false)

    const saveRating = async ()=>{
        const rate = {
            AccountId : 15,
            StoryId : 15,
            rating : value
        }
        console.log(rate)
        await sendRate(rate)
    }


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
                                        onChangeActive={(event, newHover) => {
                                            setHover(newHover);
                                        }}
                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} className='fs-1' />}
                                    />

                                </div>
                                <div className='row fs-5 justify-content-center'>
                                    {value ? `You rated this story ${value}/5` : 'Rate this story'}
                                </div>
                            </div>

                            <div className="container gap-2 btn-group mb-2">
                                <button type="button" className="btn btn-primary rounded" onClick={()=>{setMessage(!message) 
                                saveRating()
                                }} >save</button>
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