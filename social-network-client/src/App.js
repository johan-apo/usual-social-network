import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import "./App.scss";
// REDUX
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";
// COMPONENTS
import Navbar from "./components/Navbar";
import AuthRoute from "./util/AuthRoute";
// PAGES
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import User from "./pages/User";

/* -------------------------- STORE TOKEN ON LOCAL -------------------------- */

axios.defaults.baseURL =
  "https://us-central1-usual-social-network.cloudfunctions.net/api";

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  // NOTE: JS uses miliseconds, but the decoder uses UNIX EPOCH (seconds),
  // so it is necessary multiply by 1000 to convert the seconds to miliseconds
  if (decodedToken.exp * 1000 < Date.now()) {
    // when token expires
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

/* -------------------------------------------------------------------------- */
/*                                APP COMPONENT                               */
/* -------------------------------------------------------------------------- */

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <AuthRoute exact path="/login" component={Login}></AuthRoute>
          <AuthRoute exact path="/signup" component={Signup}></AuthRoute>
          <Route exact path="/users/:handle" component={User}></Route>
          <Route
            exact
            path="/users/:handle/scream/:screamId"
            component={User}
          ></Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
