import React from "react";
import useFormAndValidation from "../hooks/useFormAndValidation.js";

function AuthForm({ headerText, btnText, ...props }) {

  const {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
  } = useFormAndValidation({}, {}, false);

  return (
    <div className="auth">
      <h2 className="auth__header">{headerText}</h2>
      <form className="auth__form" onSubmit={resetForm} method="POST" noValidate>
        <div className="auth__feild">
          <input
            className="auth__input"
            aria-label="email input"
            name="email"
            type="email"
            placeholder="Email"
            required
            value={values.email}
            onChange={handleChange}
          />
          <span className="auth__error">{errors.email}</span>
        </div>

        <div className="auth__feild">
          <input
            className="auth__input"
            aria-label="password input"
            name="password"
            type="password"
            minLength="8"
            placeholder="Пароль"
            required
            value={values.password}
            onChange={handleChange}
          ></input>
          <span className="auth__error">{errors.password}</span>
        </div>

        <button className="auth__save-btn" type="submit" disabled={!isValid}>
          {btnText}
        </button>
      </form>
    </div>
  );
}

export default AuthForm;
