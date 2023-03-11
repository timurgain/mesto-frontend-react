import React from "react";
import AuthUserContext from "../../contexts/AuthUserContext.js";
import AuthButton from "./AuthButton.js";
import MenuButton from "./MenuButton.js";
import logoPath from "../../images/logo-mesto.svg";
import { useLocation, useNavigate } from "react-router-dom";

function Header({ onLogout, ...props }) {
  const { loggedIn, authUser } = React.useContext(AuthUserContext);

  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    function handleScreenResize() {
      window.innerWidth < 768 ? setIsMobile(true) : setIsMobile(false);
    }
    handleScreenResize();
    window.addEventListener("resize", handleScreenResize);
    return () => {
      window.removeEventListener("resize", handleScreenResize);
    };
  }, []);

  return (



    <header className="header">

      {false && (
        <div className="header__menu">
          <span className="header__auth-email">{authUser.email}</span>
          <AuthButton isMobile={isMobile} onLogout={onLogout} />
        </div>
      )}

      {isMobile && (
        <>
          <img
            className="header__logo"
            src={logoPath}
            alt="Логотип Место Россия"
          />

          <MenuButton isMenuOpened={null} onClick={() => {}} />
        </>
      )}

      {!isMobile && (
        <>
          <img
            className="header__logo"
            src={logoPath}
            alt="Логотип Место Россия"
          />

          <div className="header__menu">
            <span className="header__auth-email">{authUser.email}</span>
            <AuthButton isMobile={isMobile} onLogout={onLogout} />
          </div>
        </>
      )}

    </header>
  );
}

export default Header;
