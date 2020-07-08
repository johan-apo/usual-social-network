import React from "react";
import { Route, Redirect } from "react-router-dom";
// REDUX
import { connect } from "react-redux";

/* -------------------------------------------------------------------------- */
/*                               AUTH ROUTE UTIL                              */
/* -------------------------------------------------------------------------- */

function AuthRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      // props received from Redux
      render={(props) =>
        authenticated === true ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(AuthRoute);
