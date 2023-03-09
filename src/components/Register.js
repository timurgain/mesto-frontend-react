import React from "react";
import AuthForm from "./AuthForm";
import InfoTooltip from "./InfoTooltip";
import usePopupClosing from "../hooks/usePopupClosing";

function Register() {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [isSuccessful, setIsSuccessful] = React.useState(null);
  const { escClose, clickClose } = usePopupClosing(isPopupOpen, setIsPopupOpen);


  React.useEffect(() => setIsPopupOpen(false), []);
  React.useEffect(escClose, [isPopupOpen, escClose]);

  function register(baseUrl, email, password) {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    fetch(`${baseUrl}/signup`, options)
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
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
        onSubmit={register}
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
