import React, { useState, useEffect } from "react";
import axios from "axios";
// REDUX
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";
// COMPONENTS
import Scream from "../components/Scream";
import StaticProfile from "../components/StaticProfile";

/* -------------------------------------------------------------------------- */
/*                               USER COMPONENTS                              */
/* -------------------------------------------------------------------------- */

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(User);

function User(props) {
  const [state, setState] = useState({ profile: null, screamIdParam: null });

  const {
    // match comes from React Router Dom
    match: {
      params: { handle, screamId },
    },
    // gerUserData  & data come from Redux
    getUserData,
    data: { screams, loading}
  } = props;

  const { screamIdParam } = state;

  useEffect(() => {
    let mounted = true;

    if (screamId)
      setState((prevState) => ({ ...prevState, screamIdParam: screamId }));

    getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        if (mounted) {
          setState({
            profile: res.data.user,
          });
        }
      })
      .catch((err) => console.log(err));

    return () => (mounted = false);
  }, [handle, getUserData, screamId]);

  const screamsMarkup = loading ? (
    <p>Loading data...</p>
  ) : screams === null ? (
    <p>No posts from this user</p>
  ) : !screamIdParam ? (
    screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    screams.map((scream) => {
      if (scream.screamId !== screamIdParam) {
        return <Scream key={scream.screamId} scream={scream} />;
      } else {
        return <Scream key={scream.screamId} scream={scream} openDialog />;
      }
    })
  );

  return (
    <main className="user">
      <div className="screams-section">{screamsMarkup}</div>
      {state.profile === null ? (
        <p>Loading profile, please wait...</p>
      ) : (
        <StaticProfile profile={state.profile} />
      )}
    </main>
  );
}
