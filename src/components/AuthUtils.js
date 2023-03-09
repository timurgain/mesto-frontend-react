const BASE_AUTH_URL = "https://auth.nomoreparties.co";

function register(email, password) {
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

  return fetch(`${BASE_AUTH_URL}/signup`, options)
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(text);
        });
      }
      return response.json();
    })
}

function login(email, password) {
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

  return fetch(`${BASE_AUTH_URL}/signin`, options)
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(text);
        });
      }
      return response.json();
    })
}

function authorize() {
  const jwt = localStorage.getItem('jwt');
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization" : `Bearer ${jwt}`
    }
  }

  return fetch(`${BASE_AUTH_URL}/users/me`, options)
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(text);
        });
      }
      return response.json();
    })
    // .then((data) => {

    //   console.log(data);

    // })
    // .catch(reportError);
}


export { register, login, authorize }
