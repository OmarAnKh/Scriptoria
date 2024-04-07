
const Share = () => {

    return(     
        <span className="mx-5">
            <span className={`px-2 rounded heading ms-auto d-flex flex-column align-items-center`}>
                <i className="bi bi-share-fill"  style={{color: 'white', cursor: 'pointer', justifySelf: 'center', fontSize: '2rem', verticalAlign: 'middle' }}></i>
                <h6 className="text-white icon-title"> Share </h6>
            </span>
        </span>   
    );
}

export default Share;