import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import * as auth from "./AuthUtils";


function Login() {

  const navigate = useNavigate();

  function login(email, password) {
    auth.login(email, password)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        navigate('/', {replace: true})
      })
      .catch(reportError);
  }

  return (
    <AuthForm headerText="Вход" btnText="Войти" onSubmit={login} />
  )
}


export default Login
