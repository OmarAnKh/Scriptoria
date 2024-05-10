import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";


const uploader = Uploader({
    apiKey: "free"
});

const options = { multi: true };

const UploadImg = (props) => {

    return(
        <>
            <UploadButton 
                uploader={uploader}
                options={options}
                onComplete={files => {
                    props.setImgURL(files.map(x => x.fileUrl).join("\n"))
                    props.setAddProfile(true)
                }
                    }>
                {({ onClick }) =>
                    <button onClick={onClick} className="upload-button">
                        <img src={props.imgURL} className="rounded-circle image-img" style={{ width: `${props.width}px` }} alt="Profile Logo" />
                        <i className="bi bi-camera image-icon"></i>
                    </button>
                }
            </UploadButton>
        </>
    );
}

export default UploadImg;