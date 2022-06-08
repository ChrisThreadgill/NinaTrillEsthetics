import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../../store/session";
import "./AuthCSS/SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [emailErrors, setEmailErrors] = useState([]);

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmErrors, setConfirmErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [fNameErrors, setFNameErrors] = useState([]);
  const [lNameErrors, setLNameErrors] = useState([]);
  const [passwordShow, setPasswordShow] = useState("password");

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setConfirmErrors([]);
      return dispatch(sessionActions.signup({ email, fName, lName, password, phoneNum })).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setPasswordErrors(data.errors.filter((error) => error.includes("password")));
          setFNameErrors(data.errors.filter((error) => error.includes("first name")));
          setLNameErrors(data.errors.filter((error) => error.includes("last name")));
          setEmailErrors(data.errors.filter((error) => error.includes("email")));
        }
      });
    }
    return setConfirmErrors(["Passwords must match"]);
  };

  return (
    <div className="sign__up__form">
      <form onSubmit={handleSubmit}>
        <div className="sign__up__form__container">
          <label className="signup__label">
            {fNameErrors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
            <div>
              First Name <span>*</span>
            </div>
          </label>
          <input type="text" value={fName} onChange={(e) => setFName(e.target.value)} />
          <label className="signup__label">
            {lNameErrors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
            <div>
              Last Name <span>*</span>
            </div>
          </label>
          <input type="text" value={lName} onChange={(e) => setLName(e.target.value)} />
          <label className="signup__label">
            {emailErrors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
            <div>
              Email <span>*</span>
            </div>
          </label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label className="signup__label">
            {passwordErrors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
            <div className="password__label__container">
              <div>
                Password<span>*</span>
              </div>
              <div
                className="show__password"
                onClick={(e) => {
                  e.preventDefault();
                  if (passwordShow === "password") {
                    setPasswordShow("text");
                  } else {
                    setPasswordShow("password");
                  }
                }}
              ></div>
            </div>
          </label>
          <input type={passwordShow} value={password} onChange={(e) => setPassword(e.target.value)} required />

          <label className="signup__label">
            {confirmErrors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
            <div>
              Confirm Password <span>*</span>
            </div>
          </label>
          <input
            type={passwordShow}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <label className="signup__label">Phone Number</label>
          <input type="text" value={phoneNum} maxLength={10} onChange={(e) => setPhoneNum(e.target.value)} />

          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormPage;