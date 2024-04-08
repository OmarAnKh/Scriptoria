
const Genre = ({name}) => {
    return(
        <button type="button" className="btn btn-secondary mx-2 btn-sm"  style={{color: 'black', backgroundColor: '#C3CAD3', borderStyle: 'none', fontWeight: "bold", cursor: 'auto'}}>{name}</button>
    );
}

export default Genre;