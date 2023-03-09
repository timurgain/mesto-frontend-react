import React from "react";
import AuthForm from "./AuthForm";
import InfoTooltip from "./InfoTooltip";
import usePopupClosing from "../hooks/usePopupClosing";
import * as auth from "./AuthUtils";

function Register() {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [isSuccessful, setIsSuccessful] = React.useState(null);
  const { escClose, clickClose } = usePopupClosing(isPopupOpen, setIsPopupOpen);

  React.useEffect(() => setIsPopupOpen(false), []);
  React.useEffect(escClose, [isPopupOpen, escClose]);

  function handleRegister(email, password) {
    auth.register(email, password)
      .then(() => {
        setIsSuccessful(true);
        setIsPopupOpen(true);
      })
      .catch((err) => {
        reportError(err);
        setIsSuccessful(false);
        setIsPopupOpen(true);
      });
  }

  return (
    <>
      <AuthForm
        headerText="Регистрация"
        btnText="Зарегистрироваться"
        onSubmit={handleRegister}
      />
      <p className="auth__footnote">Уже зарегистрированы? Войти</p>
      <InfoTooltip
        isOpen={isPopupOpen}
        isSuccessful={isSuccessful}
        onClose={clickClose}
      />
    </>
  );
}

export default Register;
