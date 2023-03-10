import React from "react";
import AuthUserContext from "../contexts/AuthUserContext.js";
import logoPath from "../images/logo-mesto.svg";
import { useLocation, useNavigate } from "react-router-dom";

function Header({ onLogout, ...props }) {
  const { loggedIn, authUser } = React.useContext(AuthUserContext);

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Логотип Место Россия" />
      {loggedIn && <span className="header__auth-email">{authUser.email}</span>}

      {loggedIn && location.pathname === "/" && (
        <button className="header__auth-btn" type="button" onClick={onLogout}>
          Выйти
        </button>
      )}

      {!loggedIn && location.pathname === "/sign-up" && (
        <button
          className="header__auth-btn"
          type="button"
          onClick={() => navigate("/sign-in")}
        >
          Войти
        </button>
      )}

      {!loggedIn && location.pathname === "/sign-in" && (
        <button
          className="header__auth-btn"
          type="button"
          onClick={() => navigate("/sign-up")}
        >
          Регистрация
        </button>
      )}
    </header>
  );
}

export default Header;
