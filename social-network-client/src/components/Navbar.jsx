import React from "react";
import PropTypes from "prop-types";
import "./Navbar.scss";
// REDUX
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
// COMPONENTS
import PostScream from "./PostScream";
import Notifications from "./Notifications"

/* -------------------------------------------------------------------------- */
/*                              NAVBAR COMPONENT                              */
/* -------------------------------------------------------------------------- */

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(Navbar);

function Navbar(props) {
  // autheticated comes from Redux
  const { authenticated } = props;

  return (
    <header>
      <nav>
        <ul>
          {authenticated ? (
            <React.Fragment>
              <li>
                <PostScream />
              </li>
              <li>
                <NavLink to="/">
                  <svg
                    aria-hidden="true"
                    data-icon="home"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="currentColor"
                      d="M280.37 148.26L96 300.11V464a16 16 0 0016 16l112.06-.29a16 16 0 0015.92-16V368a16 16 0 0116-16h64a16 16 0 0116 16v95.64a16 16 0 0016 16.05L464 480a16 16 0 0016-16V300L295.67 148.26a12.19 12.19 0 00-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 00-12-12h-56a12 12 0 00-12 12v72.61L318.47 43a48 48 0 00-61 0L4.34 251.47a12 12 0 00-1.6 16.9l25.5 31A12 12 0 0045.15 301l235.22-193.74a12.19 12.19 0 0115.3 0L530.9 301a12 12 0 0016.9-1.6l25.5-31a12 12 0 00-1.7-16.93z"
                    />
                  </svg>
                  Home
                </NavLink>
              </li>
              <li className="notifications-container">
                <Notifications />
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li>
                <NavLink to="/">
                  <svg
                    aria-hidden="true"
                    data-icon="home"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="currentColor"
                      d="M280.37 148.26L96 300.11V464a16 16 0 0016 16l112.06-.29a16 16 0 0015.92-16V368a16 16 0 0116-16h64a16 16 0 0116 16v95.64a16 16 0 0016 16.05L464 480a16 16 0 0016-16V300L295.67 148.26a12.19 12.19 0 00-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 00-12-12h-56a12 12 0 00-12 12v72.61L318.47 43a48 48 0 00-61 0L4.34 251.47a12 12 0 00-1.6 16.9l25.5 31A12 12 0 0045.15 301l235.22-193.74a12.19 12.19 0 0115.3 0L530.9 301a12 12 0 0016.9-1.6l25.5-31a12 12 0 00-1.7-16.93z"
                    />
                  </svg>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/login">
                  <svg
                    aria-hidden="true"
                    data-icon="sign-in-alt"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M416 448h-84c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h84c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96zm-47-201L201 79c-15-15-41-4.5-41 17v96H24c-13.3 0-24 10.7-24 24v96c0 13.3 10.7 24 24 24h136v96c0 21.5 26 32 41 17l168-168c9.3-9.4 9.3-24.6 0-34z"
                    />
                  </svg>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/signup">
                  <svg
                    aria-hidden="true"
                    data-icon="user-plus"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                  >
                    <path
                      fill="currentColor"
                      d="M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                    />
                  </svg>
                  Signup
                </NavLink>
              </li>
            </React.Fragment>
          )}
        </ul>
      </nav>
    </header>
  );
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};
