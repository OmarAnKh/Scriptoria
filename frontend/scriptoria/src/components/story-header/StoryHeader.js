import Genre from './Genre';
import './StoryHeader.css'
import { useEffect, useRef, useState } from 'react';
import Icons from './icons/Icons';
import { useParams } from 'react-router-dom';
import { Buffer } from 'buffer';
import { getStory } from '../../api/storyAPI';


const StoryHeader = () => {

    const { id } = useParams()

    const [data, setData] = useState({})
    const [genres, setGenres] = useState([])

    const [coverPhoto, setCoverPhoto] = useState('')

    const [authors, setAuthors] = useState([])
    const [counts, setCounts] = useState({})

    const [isExpanded, setIsExpanded] = useState(false);
    const [showReadMore, setShowReadMore] = useState(false);
    const textRef = useRef(null);


    useEffect(() => {
        const fetchStory = async () => {
            try {
                const response = await getStory(id, 'stories');

                setAuthors(response?.accounts);
                setData(response?.story);
                setCounts(response?.counts);
                setGenres(response?.story?.genres);

                const cover = Buffer.from(response?.story?.coverPhoto).toString('base64');
                setCoverPhoto(`data:image/png;base64,${cover}`);

            } catch (error) {
                console.log(error)
            }
        }

        fetchStory();

    }, [id]);


    useEffect(() => {
        if (textRef.current) {
            setShowReadMore(textRef.current.scrollHeight > textRef.current.clientHeight);
        }

    }, [data?.description]);

    const textStyle = isExpanded ? {
        overflow: 'visible',
        display: 'block',
    } : {
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
    };


    return (
        <div className="col-lg-12 details-card" style={{ background: `linear-gradient(to bottom, ${data?.backgroundColor}, white)` }}>
            <div className="row g-0">
                <div className="col-md-2">
                    <img src={coverPhoto} className="img-fluid rounded-start details-img" alt="..." />
                </div>
                <div className="details-container col-md-10 d-md-block px-4">
                    <div className="card-body details text-white">
                        <div className="header-details">
                            <h3 className="card-title mb-2 fs-1">{data?.title}</h3>
                            <p className="author-name mb-0 fs-5">

                                {authors?.map((author, idx) => {
                                    return <span key={idx}>{author?.displayName}</span>;
                                })}

                            </p>
                            <p className="mb-1">{data?.language}</p>
                        </div>

                        <div className="description-card" style={isExpanded ? null : { display: 'flex', alignItems: 'flex-end' }}>
                            <p ref={textRef} style={textStyle} className="story-description card-text text-sm text-black fw-bold">
                                {data?.description}
                            </p>
                            {showReadMore && (
                                <button className="btn btn-link text-decoration-none text-white p-1" onClick={() => setIsExpanded(!isExpanded)} style={isExpanded ? null : { whiteSpace: 'nowrap', marginBottom: '10px' }}>
                                    {isExpanded ? 'Read Less' : 'Read More'}
                                </button>
                            )}
                        </div>

                    </div>
                    <div className='genres'>

                        {genres?.map((genre, idx) => {
                            return <Genre name={genre} key={idx} />
                        })}

                    </div>
                    <Icons data={data} id={id} counts={counts} setData={setData} />
                </div>
            </div>
        </div>
    );
}

export default StoryHeader;