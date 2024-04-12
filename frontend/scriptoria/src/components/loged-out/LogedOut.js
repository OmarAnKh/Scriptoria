import logout from "../../img/logout.png";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { useTranslation } from "react-i18next";
const LogedOut = () => {
  const { t } = useTranslation();
  return (
    <>
      <Navbar />
      <div className="container py-2 mt-5 text-center">
        <img src={logout} alt="logout" className="img-fluid" width="600" />
      </div>
      <div className="text-center mb-5">
        <p className="fw-bold h1">{t("Logout.text1")}</p>
        <Link
          className="h5 fw-bold text-secondary text-decoration-none"
          to={"/"}
        >
          {t("Logout.text2")}
        </Link>
      </div>
    </>
  );
};

export default LogedOut;
