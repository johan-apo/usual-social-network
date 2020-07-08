import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./MainPage.scss";
// REDUX
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";
// COMPONENTS
import Scream from "../components/Scream";
import Profile from "../components/Profile";

/* -------------------------------------------------------------------------- */
/*                               HOME COMPONENT                               */
/* -------------------------------------------------------------------------- */

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getScreams })(Home);

function Home(props) {
  const {
    getScreams,
    // data comes from Redux
    data: { screams, loading },
  } = props;

  useEffect(() => {
    // loading, then save data in state.data and then pass to props
    getScreams();
  }, [getScreams]);

  return (
    <main className="home">
      <div className="screams-section">
        {!loading ? (
          screams.map((scream) => {
            return <Scream key={scream.screamId} scream={scream} />;
          })
        ) : (
          <p className="loading-text">Loading...</p>
        )}
      </div>
      <Profile />
    </main>
  );
}

Home.propType = {
  data: PropTypes.object.isRequired,
  getScream: PropTypes.func.isRequired,
};
