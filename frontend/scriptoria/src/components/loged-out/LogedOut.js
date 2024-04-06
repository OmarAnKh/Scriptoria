import logout from "../../img/logout.png";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";

const ErrorPage = () => {
  return (
    <>
      <Navbar />
      <div className="container py-2 mt-5 text-center">
        <img src={logout} alt="logout" className="img-fluid" width="600" />
      </div>
      <div className="text-center mb-5">
        <p className="fw-bold h1">You have successfully logged out. </p>
        <p className="h5 fw-bold">
          <Link className="text-decoration-none" to="/">
            Click here
          </Link>{" "}
          to return to the home page.
        </p>
      </div>
    </>
  );
};

export default ErrorPage;
