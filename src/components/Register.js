import React from "react";
import AuthForm from "./AuthForm";
import InfoTooltip from "./InfoTooltip";
import usePopupClosing from "../hooks/usePopupClosing";

function Register() {
  const [isPopupOpen, setIsPopupOpen] = React.useState(true);
  const { escClose, clickClose } = usePopupClosing(isPopupOpen, setIsPopupOpen);

  React.useEffect(escClose, [isPopupOpen, escClose]);

  return (
    <>
      <AuthForm headerText="Регистрация" btnText="Зарегистрироваться" />
      <p className="auth__footnote">Уже зарегистрированы? Войти</p>
      <InfoTooltip isOpen={isPopupOpen} onClose={clickClose} />
    </>
  );
}

export default Register;
