import { useState, useEffect, useId } from "react";
import Cookies from 'js-cookie'
import Comment from "./Comment";
import Heart from "./Heart";
import Plus from "./Plus";
import Rates from "./Rates";
import Share from "./Share";
import { findAccount } from "../../../api/accountApi";

const Icons = ({data, id, counts, setData}) => {

    const [userId, setUserId] = useState()

    useEffect(() => {
        const fetchUserData = async () => {
            const user = Cookies.get("userInfo");
            console.log(user)

            try {
                const response = await findAccount({userName: user});
                setUserId(response._id);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserData();
    }, []);


    return(
        <div className='icons my-2 mx-5 d-flex gap-1 justify-content-center align-items-center' style={{ display: 'flex', alignItems: 'center', borderRadius: '10px'}}>
            <Heart num={data.likes} id={id} accountId={userId} setData={setData}/>
            <Comment id={id} num={counts.comments}/> 
            <Rates id={id} num={counts.rates} avg={counts.avg}/>
            <Plus id={id}/>
            <Share/>
        </div>
    );
}

export default Icons;