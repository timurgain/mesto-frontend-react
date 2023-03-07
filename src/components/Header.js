import logoPath from "../images/logo-mesto.svg";

function Header({authBtnText, ...props}) {
  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Логотип Место Россия" />
      <button className="header__auth-btn">Войти</button>
    </header>
  );
}

export default Header;
