import React from "react";
import AuthUserContext from "../../contexts/AuthUserContext.js";
import AuthButton from "./AuthButton.js";
import MenuButton from "./MenuButton.js";
import logoPath from "../../images/logo-mesto.svg";
import { useLocation, useNavigate } from "react-router-dom";

const MOBILE_WIDTH_FROM = 767;

function Header({ onLogout, ...props }) {
  const { loggedIn, authUser } = React.useContext(AuthUserContext);

  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = React.useState(false);
  const [isMenuOpened, setIsMenuOpened] = React.useState(false);

  React.useEffect(() => {
    function handleScreenResize() {
      window.innerWidth <= MOBILE_WIDTH_FROM
        ? setIsMobile(true)
        : setIsMobile(false);
    }
    handleScreenResize();
    window.addEventListener("resize", handleScreenResize);
    return () => {
      window.removeEventListener("resize", handleScreenResize);
    };
  }, []);

  React.useEffect(() => {
    setIsMenuOpened(false)
  }, [isMobile, location])

  function handleMenuBtnClick() {
    setIsMenuOpened(!isMenuOpened);
  }

  return (
    <>
      {isMenuOpened && (
        <div className="header__menu header__menu_type_mobile">
          {loggedIn && <span className="header__auth-email">{authUser.email}</span>}
          <AuthButton isMobile={isMobile} onLogout={onLogout} />
        </div>
      )}

      <header className="header">
        {isMobile && (
          <>
            <img
              className="header__logo"
              src={logoPath}
              alt="Логотип Место Россия"
            />

            <MenuButton
              isMenuOpened={isMenuOpened}
              onClick={handleMenuBtnClick}
            />
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
    </>
  );
}

export default Header;
