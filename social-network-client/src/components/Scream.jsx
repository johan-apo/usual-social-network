import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import "./Scream.scss"
// REDUX
import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../redux/actions/dataActions";
// COMPONENTS
import DeleteScream from "./DeleteScream";
import ScreamDetails from "./ScreamDetails";

/* -------------------------------------------------------------------------- */
/*                              SCREAM COMPONENT                              */
/* -------------------------------------------------------------------------- */

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeScream,
  unlikeScream,
};

export default connect(mapStateToProps, mapActionsToProps)(Scream);

function Scream(props) {
  const {
    // scream prop was passed by Home parent component
    scream: {
      body,
      createdAt,
      likeCount,
      commentCount,
      userImage,
      userHandle,
      screamId,
    },
    // user comes from Redux
    user: {
      likes,
      authenticated,
      credentials: { handle },
    },
  } = props;

  const likedScream = () => {
    if (likes && likes.find((like) => like.screamId === screamId)) {
      return true;
    } else return false;
  };

  const likeScream = () => {
    props.likeScream(screamId);
  };
  const unlikeScream = () => {
    props.unlikeScream(screamId);
  };

  const HeartIcon = ({ liked, whenIsClicked }) => {
    return (
      <svg
        className={liked ? "liked" : ""}
        onClick={whenIsClicked}
        aria-hidden="true"
        data-icon="heart"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path
          fill="currentColor"
          d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
        />
      </svg>
    );
  };

  const likeButton = !authenticated ? (
    <Link to="/login">
      <HeartIcon />
    </Link>
  ) : likedScream() ? (
    <HeartIcon liked whenIsClicked={unlikeScream} />
  ) : (
    <HeartIcon whenIsClicked={likeScream} />
  );

  const deleteButton =
    // the scream should be property of the current user
    authenticated && userHandle === handle ? (
      <DeleteScream screamId={screamId} />
    ) : null;

  return (
    <article className="screams-section__card">
      <div className="scream-data">
        <p className="scream-data__post">{body}</p>
        <p className="scream-data__time">
          {dayjs(createdAt).format("H:mm D/MMM/YYYY")}
        </p>
        <div className="scream-data__interactions">
          <div className="likes">
            {likeButton}
            <p>{`${
              likeCount > 1
                ? `${likeCount} likes`
                : likeCount === 1
                ? `${likeCount} like`
                : "No likes"
            }`}</p>
          </div>
          <div className="comments">
            <svg
              aria-hidden="true"
              data-icon="comment"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"
              />
            </svg>
            <p>{`${
              commentCount > 1
                ? `${commentCount} comments`
                : commentCount === 1
                ? `${commentCount} comment`
                : "No comments"
            }`}</p>
          </div>
        </div>
        <div className="scream-data__author">
          <div>
            <ScreamDetails
              openDialog={props.openDialog}
              screamIdFromHOC={screamId}
              userHandle={userHandle}
            />
            {deleteButton}
          </div>
          <div>
            <div
              style={{ backgroundImage: `url(${userImage})` }}
              className="scream-image"
            ></div>
            <Link to={`/users/${userHandle}`}>
              <h6 className="scream-username">{userHandle}</h6>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  openDialog: PropTypes.bool,
};
