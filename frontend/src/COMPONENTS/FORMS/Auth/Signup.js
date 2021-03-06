import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../../store/session";
import "./AuthCSS/SignupForm.css";
import { ExternalLink } from "react-external-link";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [emailErrors, setEmailErrors] = useState([]);
  const [blankF, setBlankF] = useState([]);
  const [blankL, setBlankL] = useState([]);

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
  const [phoneNumErrors, setPhoneNumErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fName.length || fName.trim().length === 0) return setBlankF(["Please Provide a First Name"]);
    if (!lName.length || lName.trim().length === 0) return setBlankL(["Please Provide a Last Name"]);
    if (password === confirmPassword) {
      setConfirmErrors([]);

      if (phoneNum) {
        return dispatch(sessionActions.signup({ email, fName, lName, password, phoneNum })).catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setPasswordErrors(data.errors.filter((error) => error.includes("password")));
            setFNameErrors(data.errors.filter((error) => error.includes("irst name")));
            setLNameErrors(data.errors.filter((error) => error.includes("last name")));
            setEmailErrors(data.errors.filter((error) => error.includes("Email") || error.includes("email")));
            setPhoneNumErrors(data.errors.filter((error) => error.includes("phone")));
          }
        });
      } else {
        return dispatch(sessionActions.signup({ email, fName, lName, password })).catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setPasswordErrors(data.errors.filter((error) => error.includes("password")));
            setFNameErrors(data.errors.filter((error) => error.includes("irst name")));
            setLNameErrors(data.errors.filter((error) => error.includes("ast name")));
            setEmailErrors(data.errors.filter((error) => error.includes("Email") || error.includes("email")));
            setPhoneNumErrors(data.errors.filter((error) => error.includes("phone")));
          }
        });
      }
    }
    return setConfirmErrors(["Passwords must match"]);
  };

  return (
    <div className="sign__up__form__page">
      <div className="sign__up__form">
        <form onSubmit={handleSubmit}>
          <div className="sign__up__form__container">
            <label className="signup__label">
              {fNameErrors.map((error, idx) => (
                <div className="signup__errors" key={idx}>
                  {error}
                </div>
              ))}
              {blankF.map((error, idx) => (
                <div className="signup__errors" key={idx}>
                  {error}
                </div>
              ))}
              <div className="signup__label__name">
                First Name <span>*</span>
              </div>
            </label>
            <input
              className="signup__input"
              type="text"
              value={fName}
              onChange={(e) => {
                setBlankF([]);
                setFName(e.target.value);
              }}
            />
            <label className="signup__label">
              {lNameErrors.map((error, idx) => (
                <div className="signup__errors" key={idx}>
                  {error}
                </div>
              ))}
              {blankL.map((error, idx) => (
                <div className="signup__errors" key={idx}>
                  {error}
                </div>
              ))}
              <div className="signup__label__name">
                Last Name <span>*</span>
              </div>
            </label>
            <input
              className="signup__input"
              type="text"
              value={lName}
              onChange={(e) => {
                setBlankL([]);
                setLName(e.target.value);
              }}
            />
            <label className="signup__label">
              {emailErrors.map((error, idx) => (
                <div className="signup__errors" key={idx}>
                  {error}
                </div>
              ))}
              <div className="signup__label__name">
                Email <span>*</span>
              </div>
            </label>
            <input className="signup__input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label className="signup__label">
              {passwordErrors.map((error, idx) => (
                <div className="signup__errors" key={idx}>
                  {error}
                </div>
              ))}
              <div className="password__label__container">
                <div className="signup__label__name">
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
            <input
              className="signup__input"
              type={passwordShow}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label className="signup__label">
              {confirmErrors.map((error, idx) => (
                <div className="signup__errors" key={idx}>
                  {error}
                </div>
              ))}
              <div className="signup__label__name">
                Confirm Password <span>*</span>
              </div>
            </label>
            <input
              className="signup__input"
              type={passwordShow}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <label className="signup__label">
              {phoneNumErrors.map((error, idx) => (
                <div className="signup__errors" key={idx}>
                  {error}
                </div>
              ))}

              <div className="signup__label__name">
                Phone Number <p className="optional__placeholder">optional</p>
              </div>
            </label>
            <input
              className="signup__input"
              type="text"
              value={phoneNum}
              maxLength={10}
              onChange={(e) => setPhoneNum(e.target.value)}
            />

            <button className="signup__button" type="submit">
              Sign Up
            </button>
          </div>
        </form>
      </div>
      <div className="footer__container__about" id="footer__container__signup">
        <div>
          <div>NinaTrill Esthetics LLC</div>
          <span>1127 S Gutensohn Rd, Springdale, AR 72764</span>
          <span>(479) 301-4455</span>
        </div>
        <div>
          <div>Meet the dev</div>

          {/* <ExternalLink className="about__links" href="https://www.linkedin.com/in/chris-threadgill-b05090185/">
            Portfolio
          </ExternalLink> */}
          <ExternalLink className="about__links" href="https://www.linkedin.com/in/chris-threadgill-b05090185/">
            LinkedIn
          </ExternalLink>
          <ExternalLink className="about__links" href="https://github.com/ChrisThreadgill">
            Github
          </ExternalLink>
        </div>
        <div>
          <div className="tech__used__container">Technologies Used</div>
          <container className="tech__links__div">
            <container className="tech__links__container">
              <label className="technologies__links">JavaScript</label>
              <label className="technologies__links">Express</label>
              <label className="technologies__links">NodeJS</label>
              <label className="technologies__links">Sequelize</label>
              <label className="technologies__links">PostgreSQL</label>
              <label className="technologies__links">Docker</label>
            </container>
            <container className="tech__links__container__right">
              <label className="technologies__links">HTML/CSS</label>
              <label className="technologies__links">React</label>
              <label className="technologies__links">Redux</label>
              <label className="technologies__links">Github</label>
              <label className="technologies__links">YAML</label>
            </container>
          </container>
        </div>
      </div>
    </div>
  );
}

export default SignupFormPage;
