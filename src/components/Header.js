import React from "react";
import AuthUserContext from "../contexts/AuthUserContext.js";
import logoPath from "../images/logo-mesto.svg";
import { useLocation, useNavigate } from "react-router-dom";

function Header({ onLogout, ...props }) {
  const { loggedIn, authUser } = React.useContext(AuthUserContext);

  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Логотип Место Россия" />
      {loggedIn && <span className="header__auth-email">{authUser.email}</span>}
      {loggedIn && (
        <button className="header__auth-btn" type="button" onClick={onLogout}>
          Выйти
        </button>
      )}
    </header>
  );
}

export default Header;
