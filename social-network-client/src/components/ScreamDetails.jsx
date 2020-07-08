import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
// REDUX
import { connect } from "react-redux";
import { getScream, clearErrors } from "../redux/actions/dataActions";
// COMPONENTS
import Comments from "./Comments";
import CommentForm from "./CommentForm";

/* ------------------------- Scream details - modal ------------------------- */

const ScreamDialogue = (props) => {
  const {
    // come from Scream grandparent component
    screamIdFromHOC,
    // getScream,clearErrors, scream & UI come from Redux
    getScream,
    clearErrors,
    UI: { loading },
    scream: { body, createdAt, userImage, userHandle, comments, screamId },
  } = props;

  const doClose = () => {
    clearErrors();
    props.close();
  };

  useEffect(() => {
    getScream(screamIdFromHOC);
  }, [screamIdFromHOC, getScream]);

  const screamDialogueJSX = (
    <div className="backdrop-dialogue" onClick={doClose}>
      <div
        className="dialogue dialogue--scream-details"
        onClick={(e) => e.stopPropagation()}
      >
        {loading ? (
          <span className="square-loading"></span>
        ) : (
          <React.Fragment>
            <div
              className="dialogue__scream-user-image"
              style={{ backgroundImage: `url(${userImage})` }}
            ></div>
            <Link to={`/users/${userHandle}`}>
              <h3 className="dialogue__scream-user-handle">@{userHandle}</h3>
            </Link>
            <p className="dialogue__scream-date">
              {dayjs(createdAt).format("H:mm D/MMM/YYYY")}
            </p>
            <p className="dialogue__scream-body">{body}</p>
            <CommentForm screamId={screamId} />
            <Comments comments={comments} />
          </React.Fragment>
        )}
      </div>
    </div>
  );

  return createPortal(
    screamDialogueJSX,
    document.getElementById("info-scream-portal")
  );
};

const mapStateToProps = (state) => ({
  scream: state.data.scream,
  UI: state.UI,
});

const ScreamDialogueWithConnection = connect(mapStateToProps, {
  getScream,
  clearErrors,
})(ScreamDialogue);

/* -------------------------------------------------------------------------- */
/*                          SCREAM DETAILS COMPONENT                          */
/* -------------------------------------------------------------------------- */

export default function ScreamDetails(props) {
  const [isOpened, setIsOpened] = useState(false);
  const [path, setPath] = useState({ oldPath: "", newPath: "" });

  const handleOpen = () => {
    let oldPath = window.location.pathname;
    const { screamIdFromHOC, userHandle } = props;
    const newPath = `/users/${userHandle}/scream/${screamIdFromHOC}`;

    if (oldPath === newPath) oldPath = `/users/${userHandle}`;
    window.history.pushState(null, null, newPath);
    setPath({ oldPath, newPath });
    setIsOpened(true);
  };

  const handleClose = () => {
    window.history.pushState(null, null, path.oldPath);
    setIsOpened(false);
  };

  useEffect(() => {
    if (props.openDialog) {
      handleOpen();
    }
  });

  return (
    <React.Fragment>
      <svg
        className="info-icon"
        onClick={handleOpen}
        aria-hidden="true"
        data-icon="info-circle"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path
          fill="currentColor"
          d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"
        />
      </svg>
      {isOpened && (
        <ScreamDialogueWithConnection
          screamIdFromHOC={props.screamIdFromHOC}
          close={handleClose}
        />
      )}
    </React.Fragment>
  );
}
