import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import "./Dialogue.scss";
// REDUX
import { connect } from "react-redux";
import { postScream, clearErrors } from "../redux/actions/dataActions";

/* --------------------------- Post scream - modal -------------------------- */

function PostScreamDialogue(props) {
  const [state, setState] = useState({
    body: "",
    errors: {},
  });

  const {
    UI: { loading, errors },
  } = props;

  const handleChange = (e) => {
    const name = e.target.name,
      value = e.target.value;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toClose = () => {
    props.close();
    if (errors) props.clearErrors();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.postScream({ body: state.body });
  };

  useEffect(() => {
    if (errors) {
      setState((prevState) => ({
        ...prevState,
        errors,
      }));
    }
    if (!errors && !loading) {
      setState({ body: "", errors: {} });
    }
  }, [errors, loading]);

  const postScreamDialogueJSX = (
    <div className="backdrop-dialogue" onClick={toClose}>
      <div className="dialogue" onClick={(e) => e.stopPropagation()}>
        <h1 className="dialogue__title">Add a new post</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="body">Text here your new post</label>
          {state.errors && <small>{state.errors.body}</small>}
          <textarea
            name="body"
            id="body"
            rows="5"
            value={state.body}
            onChange={handleChange}
            placeholder="Today I learnt something new!, would you like to know about it?"
          ></textarea>
          <input type="submit" value="Post!" />
          {loading && (
            <span className="square-loading square-loading--notalone"></span>
          )}
        </form>
      </div>
    </div>
  );

  return createPortal(
    postScreamDialogueJSX,
    document.getElementById("post-scream-portal")
  );
}

PostScreamDialogue.propTypes = {
  postScream: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const PostScreamDialogueWithConnection = connect(mapStateToProps, {
  postScream,
  clearErrors,
})(PostScreamDialogue);

/* -------------------------------------------------------------------------- */
/*                            POST SCREAM COMPONENT                           */
/* -------------------------------------------------------------------------- */

export default function PostScream() {
  const [isOpened, setIsOpened] = useState(false);

  const toggleOpen = () => {
    setIsOpened((prevState) => !prevState);
  };

  return (
    <React.Fragment>
      <div onClick={toggleOpen}>
        <svg
          aria-hidden="true"
          data-icon="plus"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
          />
        </svg>
        Add post
      </div>
      {isOpened && (
        <PostScreamDialogueWithConnection
          close={toggleOpen}
          isOpened={isOpened}
        />
      )}
    </React.Fragment>
  );
}
