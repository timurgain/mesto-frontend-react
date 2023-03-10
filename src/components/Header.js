import React from "react";
import AuthUserContext from "../contexts/AuthUserContext.js";
import logoPath from "../images/logo-mesto.svg";

function Header() {
  const {loggedIn, authUser} = React.useContext(AuthUserContext);


  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Логотип Место Россия" />
      {loggedIn && <span className="header__auth-email">{authUser.email}</span>}
      <button className="header__auth-btn">Войти</button>
    </header>
  );
}

export default Header;
