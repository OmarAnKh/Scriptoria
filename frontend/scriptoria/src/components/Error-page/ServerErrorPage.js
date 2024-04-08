import ErrorImg from "../../img/Server.png";
import Navbar from "../navbar/Navbar";

const ErrorPage = () => {
    return (
        <>
            <Navbar />
            <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
                <div className="row">
                    <div className="col text-center">
                        <img src={ErrorImg} alt="ErrorImg" className="img-fluid" />
                        <p className="mt-2" style={{ fontSize: "calc(3.375rem + 1.5vw)", fontWeight: "bold" }}>Seems like a server error?!</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ErrorPage;
