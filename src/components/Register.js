import AuthForm from "./AuthForm";

function Register() {
  return (
    <>
      <AuthForm headerText="Регистрация" btnText="Зарегистрироваться" />
      <p className="auth__footnote">Уже зарегистрированы? Войти</p>
    </>
  );
}

export default Register;
