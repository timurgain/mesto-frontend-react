import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import logoPath from "../images/logo-mesto.svg";

function Header() {
  const currentUser = React.useContext(CurrentUserContext);


  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Логотип Место Россия" />
      {true && <span className="header__auth-email">{currentUser.name}</span>}
      <button className="header__auth-btn">Войти</button>
    </header>
  );
}

export default Header;
