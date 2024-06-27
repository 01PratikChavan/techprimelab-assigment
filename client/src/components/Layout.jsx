import backArrow from "../assets/back_arrow.svg";
import logoutIcon from "../assets/Logout.svg";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer.jsx";
import logoIcon from "../assets/Logo.svg";

const Layout = (props) => {
  const navigate = useNavigate();

    

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div className="bg-headerbg bg-no-repeat h-16 sm:h-[120px] bg-left-bottom bg-cover flex justify-between items-center fixed top-0 sm:left-7 left-0 right-0 z-50 sm:-z-0 sm:w-screen sm:pb-6 ">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 ml-7">
          <div className="cursor-pointer z-101">
            <img
              onClick={() => {
                navigate("/dashboard");
              }}
              src={backArrow}
              alt="backArrow"
              className="w-[11px] h-[22px] mr-2 ml-3 cursor-pointer z-101"
            />
          </div>
          <h1 className="text-white text-2xl font-roboto font-semibold">
            {props.title}
          </h1>
        </div>

        <img
          src={logoIcon}
          alt="logo"
          className="hidden sm:flex h-14 w-fit self-center sm:absolute sm:left-1/2"
        />

        <img
          onClick={handleLogout}
          src={logoutIcon}
          alt="backArrow"
          className="sm:hidden cursor-pointer w-6 mr-6"
        />
      </div>

      <div className="bg-gray-100">
        {/* {vertical row on desktop} */}
        <main className="sm:absolute sm:left-[45px]  sm:overflow-hidden   sm:h-[98vh] ml-3 pt-[75px] sm:pt-0 mx-3 my-2 sm:z-51">
          {props.children}
        </main>
      </div>

      <Footer />
    </>
  );
};

export default Layout;
