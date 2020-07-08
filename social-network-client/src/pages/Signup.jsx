import React, { useState, useEffect } from "react";
import "./LogSign.scss";
// REDUX
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

/* -------------------------------------------------------------------------- */
/*                              SIGNUP COMPONENT                              */
/* -------------------------------------------------------------------------- */

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { signupUser })(Signup);

function Signup(props) {
  const [signupState, setSignupState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    handle: "",
    errors: {},
  });
  
  const {
    // UI & signupUser comes from Redux
    UI: { loading, errors },
    signupUser
  } = props;

  let handleSubmit = (e) => {
    e.preventDefault();
    setSignupState((prevState) => ({ ...prevState, loading: true }));
    const newUserData = {
      email: signupState.email,
      password: signupState.password,
      confirmPassword: signupState.confirmPassword,
      handle: signupState.handle,
    };
    signupUser(newUserData, props.history);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setSignupState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  useEffect(() => {
    if (errors) {
      setSignupState((prevState) => ({
        ...prevState,
        errors,
      }));
    }
  }, [errors]);

  return (
    <main className="signup">
      <h1>Signup</h1>
      <form noValidate onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail</label>
        {signupState.errors.email && <small>{signupState.errors.email}</small>}
        <input
          id="email"
          type="email"
          name="email"
          value={signupState.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        {signupState.errors.password && (
          <small>{signupState.errors.password}</small>
        )}
        <input
          id="password"
          type="password"
          name="password"
          value={signupState.password}
          onChange={handleChange}
        />
        <label htmlFor="confirmPassword">Confirm password</label>
        {signupState.errors.confirmPassword && (
          <small>{signupState.errors.confirmPassword}</small>
        )}
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={signupState.confirmPassword}
          onChange={handleChange}
        />
        <label htmlFor="handle">Handle</label>
        {signupState.errors.handle && (
          <small>{signupState.errors.handle}</small>
        )}
        <input
          id="handle"
          type="text"
          name="handle"
          value={signupState.handle}
          onChange={handleChange}
        />
        {signupState.errors.general && <p>{signupState.errors.general}</p>}
        <input type="submit" value="Signup" />
        {loading && <span className="square-loading"></span>}
      </form>
    </main>
  );
}
