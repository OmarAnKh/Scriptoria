import Comment from "./Comment";
import Heart from "./Heart";
import Plus from "./Plus";
import Rates from "./Rates";
import Share from "./Share";

const Icons = ({data, id, counts, point, setData}) => {
    return(
        <div className='icons my-2 mx-5 d-flex gap-1 justify-content-center align-items-center' style={{ display: 'flex', alignItems: 'center', borderRadius: '10px'}}>
            <Heart num={data.likes} id={id} point={point} setData={setData}/>
            <Comment id={id} num={counts.comments}/> 
            <Rates id={id} num={counts.rates} avg={counts.avg}/>
            <Plus id={id}/>
            <Share/>
        </div>
    );
}

export default Icons;