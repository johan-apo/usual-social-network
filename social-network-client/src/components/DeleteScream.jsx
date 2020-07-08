import React, { useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import "./Dialogue.scss"
// REDUX
import { connect } from "react-redux";
import { deleteScream } from "../redux/actions/dataActions";

/* -------------------------- Delete Scream - modal ------------------------- */

function DeleteScreamDialogue(props) {
  const doDeleteScream = () => {
    // deleteScream comes from Redux
    props.deleteScream(props.screamId);
    props.close()
  };

  const deleteScreamDialogueJSX = (
    <div className="backdrop-dialogue" onClick={props.close}>
      <div
        className="dialogue"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1 className="dialogue__title">Are you sure you want to remove this post?</h1>
        <div className="dialogue__buttons-container">
          <button onClick={props.close}>No</button>
          <button onClick={doDeleteScream}>Yes</button>
        </div>
      </div>
    </div>
  );

  return createPortal(
    deleteScreamDialogueJSX,
    document.getElementById("delete-scream-portal")
  );
}

DeleteScreamDialogue.propTypes = {
  deleteScream: PropTypes.func.isRequired,
};

const DeleteScreamDialogueWithConnection = connect(null, { deleteScream })(
  DeleteScreamDialogue
);

/* -------------------------------------------------------------------------- */
/*                           DELETE SCREAM COMPONENT                          */
/* -------------------------------------------------------------------------- */

export default function DeleteScream(props) {
  const [isOpened, setIsOpened] = useState(false);

  const toggleOpen = () => {
    setIsOpened((prevState) => !prevState);
  };

  return (
    <React.Fragment>
      <svg
        className="delete-icon"
        onClick={toggleOpen}
        aria-hidden="true"
        data-icon="trash-alt"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <path
          fill="currentColor"
          d="M32 464a48 48 0 0048 48h288a48 48 0 0048-48V128H32zm272-256a16 16 0 0132 0v224a16 16 0 01-32 0zm-96 0a16 16 0 0132 0v224a16 16 0 01-32 0zm-96 0a16 16 0 0132 0v224a16 16 0 01-32 0zM432 32H312l-9.4-18.7A24 24 0 00281.1 0H166.8a23.72 23.72 0 00-21.4 13.3L136 32H16A16 16 0 000 48v32a16 16 0 0016 16h416a16 16 0 0016-16V48a16 16 0 00-16-16z"
        />
      </svg>
      {isOpened && (
        <DeleteScreamDialogueWithConnection
          screamId={props.screamId}
          close={toggleOpen}
        />
      )}
    </React.Fragment>
  );
}
