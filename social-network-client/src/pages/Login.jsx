import React, { useState, useEffect } from "react";
import "./LogSign.scss";
// REDUX
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

/* -------------------------------------------------------------------------- */
/*                               LOGIN COMPONENT                              */
/* -------------------------------------------------------------------------- */

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { loginUser })(Login);

function Login(props) {
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
    errors: "",
  });

  const {
    // UI & loginUser comes from Redux
    UI: { loading, errors },
    loginUser
  } = props;

  let handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: loginState.email,
      password: loginState.password,
    };
    loginUser(userData, props.history);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value; 

    setLoginState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (errors) {
      setLoginState((prevState) => ({
        ...prevState,
        errors,
      }));
    }
  }, [errors]);

  return (
    <main className="login">
      <h1>Login</h1>
      <form noValidate onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail</label>
        {loginState.errors.email && <small>{loginState.errors.email}</small>}
        <input
          id="email"
          type="email"
          name="email"
          value={loginState.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        {loginState.errors.password && (
          <small>{loginState.errors.password}</small>
        )}
        <input
          id="password"
          type="password"
          name="password"
          value={loginState.password}
          onChange={handleChange}
        />
        {loginState.errors.general && <p>{loginState.errors.general}</p>}
        <input type="submit" value="Login" />
        {loading && <span className="square-loading"></span>}
      </form>
    </main>
  );
}

