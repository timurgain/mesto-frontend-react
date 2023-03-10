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

function authorize(token) {
  const options = {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization" : `Bearer ${token}`
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
}


export { register, login, authorize }
