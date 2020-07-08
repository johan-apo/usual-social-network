import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import "./Dialogue.scss";
// REDUX
import { connect } from "react-redux";
import { editUserDetails } from "../redux/actions/userActions";

/* -------------------------- Edit details - modal -------------------------- */

function EditDialogue(props) {
  const [state, setState] = useState({
    bio: "",
    website: "",
    location: "",
  });

  const mapUserDetailsToState = (credentials) => {
    setState((prevState) => ({
      ...prevState,
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : "",
    }));
  };

  useEffect(() => {
    // credentials comes from Redux
    const credentials = props.credentials;
    mapUserDetailsToState(credentials);
  }, [props.credentials]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { bio, website, location } = state;
    const userDetails = {
      bio,
      website,
      location,
    };
    // editUserDetails comes from Redux
    props.editUserDetails(userDetails);
  };

  const editDialogueJSX = (
    <div className="backdrop-dialogue" onClick={props.close}>
      <div
        className="dialogue"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1 className="dialogue__title">Edit your details</h1>
        <form className="dialogue__form" noValidate onSubmit={handleSubmit}>
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            placeholder="A short biography about you"
            rows="3"
            value={state.bio}
            onChange={handleChange}
          />
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="text"
            name="website"
            placeholder="Your personal or professional website"
            value={state.website}
            onChange={handleChange}
          />
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            name="location"
            placeholder="Where you live"
            value={state.location}
            onChange={handleChange}
          />
          <div className="input-container">
            <input type="button" value="Cancel" onClick={props.close} />
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(
    editDialogueJSX,
    document.getElementById("edit-details-portal")
  );
}

EditDialogue.propTypes = {
  credentials: PropTypes.object.isRequired,
  editUserDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

const EditDialogueWithConnection = connect(mapStateToProps, {
  editUserDetails,
})(EditDialogue);

/* -------------------------------------------------------------------------- */
/*                           EDIT DETAILS COMPONENT                           */
/* -------------------------------------------------------------------------- */

function EditDetails() {
  const [isOpened, setIsOpened] = useState(false);

  const toggleOpen = () => {
    setIsOpened((prevState) => !prevState);
  };

  return (
    <React.Fragment>
      <svg
        onClick={toggleOpen}
        className="edit-profile-icon"
        aria-hidden="true"
        data-icon="edit"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
      >
        <path
          fill="currentColor"
          d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"
        />
      </svg>
      {isOpened && <EditDialogueWithConnection close={toggleOpen} />}
    </React.Fragment>
  );
}

export default EditDetails;
