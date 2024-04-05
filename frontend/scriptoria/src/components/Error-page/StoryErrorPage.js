import ErrorImg from "../../img/BookPage.png";
import Navbar from "../navbar/Navbar";

const ErrorPage = () => {
    return (
        <>
            <Navbar />
            <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
                <div className="row">
                    <div className="col text-center">
                        <img src={ErrorImg} alt="ErrorImg" className="img-fluid" />
                        <p className="mt-2" style={{ fontSize: "calc(2.375rem + 1.5vw)", fontWeight: "bold" }}>Search something less silly next time!</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ErrorPage;
