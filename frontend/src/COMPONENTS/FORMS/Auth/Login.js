import React, { useState } from "react";
import * as sessionActions from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./AuthCSS/LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <div className="login__page__container">
      <form onSubmit={handleSubmit} className="login__form">
        <label className="login__form__labels">
          <div>Phone Number/Email</div>
          <input
            className="login__form__input"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label className="login__form__labels">
          <div>Password</div>
          <input
            className="login__form__input"
            type="password"
            value={password}
            onFocus={() => setErrors([])}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.map((error, idx) => (
          <div key={idx} className="login__error">
            {error}
          </div>
        ))}
        <button className="login__button" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginFormPage;
