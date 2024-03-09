import React, { useState } from 'react';
import './StoryCard.css'
import StarRating from '../star-rating/StarRating';
const StoryCard = () => {
    const [visiblestory, setVisiblestory] = useState(3);
    const loadMoreCards = () => {
        setVisiblestory((prevCount) => prevCount + 3);
    };
    const storyData = [
        {
            id: 1,
            title: 'superman',
            author: 'by name ',
            image: 'https://i.pinimg.com/originals/b2/19/21/b2192115221557ec63aaefdcd1e64c4a.jpg',
            description: 'Superman: Chronicles the transformation of Clark Kent into the iconic superhero, highlighting his origin and unwavering commitment to justice.',
            voters: 850,
            rating: 2,
            color: " bg-warning"
        },
        {
            id: 2,
            title: 'Batman',
            author: 'by name ',
            image: 'https://imgix-media.wbdndc.net/ingest/book/preview/510d37e5-c2b6-4430-94c8-ea1aebd8fc2d/affa926f-7434-449d-ad14-0ab0a757b68a/0.jpg',
            description: 'Batman: Follow Bruce Wayne s evolution into the Dark Knight as he battles crime in Gotham.',
            voters: 850,
            rating: 3.5,
            color: "bg-secondary "
        },
        {
            id: 3,
            title: 'solo leveling',
            author: 'by name ',
            image: 'https://images-na.ssl-images-amazon.com/images/I/31zw0daVfwL._SX331_BO1%2C204%2C203%2C200_.jpg',
            description: 'Solo Leveling" chronicles Jinwoo s growth as a hunter with a unique power in a monster-filled world, catering to fans of action.',
            voters: 850,
            rating: 1.7,
            color: "bg-dark text-white"
        },
        {
            id: 4,
            title: 'superman',
            author: 'by name',
            image: 'https://m.media-amazon.com/images/I/51bmUW46V-L.jpg',
            description: 'Superman: Chronicles the transformation of Clark Kent into the iconic superhero, highlighting his origin and unwavering commitment to justice.',
            voters: 850,
            rating: 4.8,
            color: "bg-info"
        },
        {
            id: 5,
            title: 'Batman',
            author: 'by name ',
            image: 'https://imgix-media.wbdndc.net/ingest/book/preview/510d37e5-c2b6-4430-94c8-ea1aebd8fc2d/affa926f-7434-449d-ad14-0ab0a757b68a/0.jpg',
            description: 'Batman: Follow Bruce Wayne s evolution into the Dark Knight as he battles crime in Gotham, revealing the essence of justice and resilience in the iconic superhero.',
            voters: 850,
            rating: 4,
            color: "bg-secondary "
        },
    ];

    return (
        <div className="container">
            <div className="row">
                {storyData.map((story, index) => (
                    <div key={story.id} className={`col-md-4 mb-3 ${index >= visiblestory ? 'd-none' : ''} my-5`}>
                        <div className={`card mb-3 ${story.color}`} >
                            <div className="row no-gutters">
                                <div className="col-md-4">
                                    <img src={story.image} alt="" className="card-img" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title text-white  ">{story.title}</h5>
                                        <h6 className="author text-white" >{story.author}</h6>
                                        <div className="d-flex ">
                                            <StarRating rating={story.rating} />
                                            <div className='voters text-white '>{story.voters} votes</div>
                                        </div>
                                        <p className="card-text text-white ">{story.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {visiblestory < storyData.length && (
                <button type="button" className="btn btn-show-more " onClick={loadMoreCards}> Show more </button>
            )}
        </div>
    );
};
export default StoryCard;
