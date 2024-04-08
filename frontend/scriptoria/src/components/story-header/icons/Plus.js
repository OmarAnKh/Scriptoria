import Lists from "../../popups/reading-lists/Lists";

const Plus = ({id}) => {

    return(     
        <span className="mx-5">
            <span className={`px-2 rounded heading ms-auto d-flex flex-column align-items-center`}>
                <Lists storyId={id}/>
                <h6 className="text-white icon-title"> Add to reading list </h6>
            </span>
        </span>   
    );
}

export default Plus;