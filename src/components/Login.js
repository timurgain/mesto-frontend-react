import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import * as auth from "../utils/apiAuth";

function Login({ onLogin, ...props }) {
  const navigate = useNavigate();

  function login(email, password) {
    auth.login(email, password)
      .then((data) => {
        if (!data.token) throw new Error("There is no token from server while login");
        localStorage.setItem("token", data.token);
        onLogin();
        navigate("/", { replace: true });
      })
      .catch(reportError);
  }

  return <AuthForm headerText="Вход" btnText="Войти" onSubmit={login} />;
}

export default Login;
