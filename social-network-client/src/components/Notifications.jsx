import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// REDUX
import { connect } from "react-redux";
import { markNotificationsRead } from "../redux/actions/userActions";

/* -------------------------------------------------------------------------- */
/*                           NOTIFICATIONS COMPONENT                          */
/* -------------------------------------------------------------------------- */

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});

export default connect(mapStateToProps, { markNotificationsRead })(
  Notifications
);

function Notifications(props) {
  dayjs.extend(relativeTime);

  const [state, setState] = useState({
    popupIsOpen: false,
  });
  // notifications comes from Redux
  const notifications = props.notifications;

  const handleOpen = () =>
    setState((prevState) => ({ ...prevState, popupIsOpen: true }));

  const handleClose = () =>
    setState((prevState) => ({ ...prevState, popupIsOpen: false }));

  const onMenuOpened = () => {
    let unreadNotificationsIds = notifications
      .filter((notification) => !notification.read)
      .map((notification) => notification.notificationId);
    props.markNotificationsRead(unreadNotificationsIds);
  };

  const NotifIcon = ({ notificationBadge, unreadNotifications }) => {
    return (
      <div
        onClick={handleOpen}
        className={`notification${
          notificationBadge ? " notification--badge" : ""
        }`}
        data-unread-notif={unreadNotifications}
      >
        <svg
          aria-hidden="true"
          data-icon="newspaper"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path
            fill="currentColor"
            d="M552 64H112c-20.858 0-38.643 13.377-45.248 32H24c-13.255 0-24 10.745-24 24v272c0 30.928 25.072 56 56 56h496c13.255 0 24-10.745 24-24V88c0-13.255-10.745-24-24-24zM48 392V144h16v248c0 4.411-3.589 8-8 8s-8-3.589-8-8zm480 8H111.422c.374-2.614.578-5.283.578-8V112h416v288zM172 280h136c6.627 0 12-5.373 12-12v-96c0-6.627-5.373-12-12-12H172c-6.627 0-12 5.373-12 12v96c0 6.627 5.373 12 12 12zm28-80h80v40h-80v-40zm-40 140v-24c0-6.627 5.373-12 12-12h136c6.627 0 12 5.373 12 12v24c0 6.627-5.373 12-12 12H172c-6.627 0-12-5.373-12-12zm192 0v-24c0-6.627 5.373-12 12-12h104c6.627 0 12 5.373 12 12v24c0 6.627-5.373 12-12 12H364c-6.627 0-12-5.373-12-12zm0-144v-24c0-6.627 5.373-12 12-12h104c6.627 0 12 5.373 12 12v24c0 6.627-5.373 12-12 12H364c-6.627 0-12-5.373-12-12zm0 72v-24c0-6.627 5.373-12 12-12h104c6.627 0 12 5.373 12 12v24c0 6.627-5.373 12-12 12H364c-6.627 0-12-5.373-12-12z"
          />
        </svg>
        Notifications
      </div>
    );
  };

  const NotifPopup = () => {
    useEffect(() => {
      onMenuOpened();
    }, []);

    return (
      <div className="notif-popup">
        <svg
          className="notif-popup__cross-btn"
          onClick={() => {
            setState((prevState) => ({
              ...prevState,
              popupIsOpen: false,
            }));
          }}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 352 512"
        >
          <path
            fill="currentColor"
            d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
          />
        </svg>
        {notifications && notifications.length > 0 ? (
          notifications.map((notification) => {
            const verb =
              notification.type === "like" ? "liked" : "commented on";
            const time = dayjs(notification.createdAt).fromNow();
            const iconColor = notification.read ? "isread" : "noread";
            const icon =
              notification.type === "like" ? (
                <svg
                  className={`notif-icon ${iconColor}`}
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
              ) : (
                <svg
                  className={`notif-icon ${iconColor}`}
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
              );
            return (
              <div
                className="notif-popup__notification"
                key={notification.createdAt}
                onClick={handleClose}
              >
                {icon}
                <Link
                  className="notif-popup__notification-text"
                  to={`/users/${notification.recipient}/scream/${notification.screamId}`}
                >
                  {`${notification.sender} ${verb} your post ${time}`}
                </Link>
              </div>
            );
          })
        ) : (
          <p>You have no notifications yet</p>
        )}
      </div>
    );
  };

  let notificationIcon;
  if (notifications && notifications.length > 0) {
    let unreadNotifications = notifications.filter(
      (notification) => notification.read === false
    ).length;
    unreadNotifications > 0
      ? (notificationIcon = (
          <NotifIcon
            notificationBadge
            unreadNotifications={unreadNotifications}
          />
        ))
      : (notificationIcon = <NotifIcon />);
  } else {
    notificationIcon = <NotifIcon />;
  }

  return (
    <React.Fragment>
      {notificationIcon}
      {state.popupIsOpen && <NotifPopup />}
    </React.Fragment>
  );
}
