import React from "react";
import dayjs from "dayjs";

/* -------------------------------------------------------------------------- */
/*                             COMMENTS COMPONENT                             */
/* -------------------------------------------------------------------------- */

export default function Comments(props) {
  return (
    <div className="comments-container">
      {props.comments &&
        props.comments.map((comment, index) => {
          const { body, createdAt, userHandle, userImage } = comment;
          return (
            <React.Fragment key={createdAt}>
              <div className="comment">
                <div
                  className="comment__user-image"
                  style={{ backgroundImage: `url(${userImage})` }}
                ></div>
                <div className="comment__details">
                  <h3 className="comment__user-handle">@{userHandle}</h3>
                  <p className="comment__date">
                    {dayjs(createdAt).format("H:mm D/MMM/YYYY")}
                  </p>
                  <p className="comment__body">{body}</p>
                </div>
              </div>
              {index !== props.comments.length - 1 && <hr />}
            </React.Fragment>
          );
        })}
    </div>
  );
}
