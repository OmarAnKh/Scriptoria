import StarRating from "../../star-rating/StarRating";
import Rate from "../../popups/rate/Rate";
import { useEffect, useState } from "react";
import { getStoryRates } from "../../../api/rateApi";

const Rates = ({id, t}) => {

    const [ratings, setRatings] = useState(0)
    const [votes, setVotes] = useState(0)
    const [triggerRate, setTriggerRate] = useState(false)

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const response = await getStoryRates('rates', id);
                setRatings(response.counts.avg);
                setVotes(response.counts.rates);
            } catch (error) {
                console.log(error)
            }
        }

        fetchRatings();
    }, [triggerRate])

    return(     
        <span className="mx-5">
            <span className={`px-2 rounded heading ms-auto text-white d-flex flex-column align-items-center`}>
                <Rate id={id} setTriggerRate={setTriggerRate}/>
                <StarRating rating={ratings}/>
                <h6 className="my-0 mx-1 icon-title" style={{justifySelf: 'center'}}> {votes} {t("StoryHeader.votes")}</h6>
            </span>
        </span>   
    );
}

export default Rates;