import React, { useState, useEffect } from "react";
// REDUX
import { connect } from "react-redux";
import { submitComment } from "../redux/actions/dataActions";

/* -------------------------------------------------------------------------- */
/*                           COMMENT FORM COMPONENT                           */
/* -------------------------------------------------------------------------- */

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  UI: state.UI,
});

export default connect(mapStateToProps, { submitComment })(CommentForm);

function CommentForm(props) {
  const [state, setState] = useState({
    body: "",
    errors: {},
  });

  const {
    screamId,
    // authenticated & UI come from props
    authenticated,
    UI: { errors, loading },
  } = props;
  
  useEffect(() => {
    if (errors) {
      setState((prevState) => ({ ...prevState, errors: errors }));
    }
    if (!errors && !loading) {
      setState((prevState) => ({ ...prevState, body: "" }));
    }
  }, [errors, loading]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.submitComment(screamId, { body: state.body });
    if (!state.errors.comment)
      setState((prevState) => ({ ...prevState, body: "" }));
  };

  const commentFormMarkup = authenticated ? (
    <form onSubmit={handleSubmit}>
      <label htmlFor="body">Comment on post</label>
      {state.errors.comment ? <small>{state.errors.comment}</small> : null}
      <textarea
        name="body"
        id="body"
        rows="5"
        placeholder="Wow! Great post hommie!"
        value={state.body}
        onChange={handleChange}
      ></textarea>
      <input type="submit" value="Comment"></input>
    </form>
  ) : null;

  return commentFormMarkup;
}
