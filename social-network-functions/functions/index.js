const functions = require("firebase-functions");
const { db } = require("./util/admin"); // admin.firestore()
const {
  getAllScreams,
  postOneScream,
  getScream,
  commentOnScream,
  likeScream,
  unlikeScream,
  deleteScream,
} = require("./handlers/screams");
const {
  signUp,
  logIn,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
  getUserDetails,
  markNotificationsRead,
} = require("./handlers/users");
const FBAuth = require("./util/fbAuth");
const app = require("express")();
const cors = require("cors");

app.use(cors());

/* ------------------------------- POST ROUTES ------------------------------ */

// GET ALL SCREAMS
app.get("/screams", getAllScreams);
// POST ONE SCREAM
app.post("/scream", FBAuth, postOneScream);
// GET SCREAM BY ID
app.get("/scream/:screamId", getScream);
// COMMENT SCREAM BY ID
app.post("/scream/:screamId/comment", FBAuth, commentOnScream);
// LIKE SCREAM BY ID
app.get("/scream/:screamId/like", FBAuth, likeScream);
// UNLIKE SCREAM BY ID
app.get("/scream/:screamId/unlike", FBAuth, unlikeScream);
// DELETE SCREAM BY ID
app.delete("/scream/:screamId", FBAuth, deleteScream);

/* ------------------------------- USER ROUTES ------------------------------ */

// SIGN UP ROUTE
app.post("/signup", signUp);
// LOGIN ROUTE
app.post("/login", logIn);
// UPLOAD AN AVATAR
app.post("/user/image", FBAuth, uploadImage);
// POST DETAILS
app.post("/user", FBAuth, addUserDetails);
// GET OWN USER INFO
app.get("/user", FBAuth, getAuthenticatedUser);
// GET USER DETAILS
app.get("/user/:handle", getUserDetails);
// MARK NOTIF AS READ
app.post("/notifications", FBAuth, markNotificationsRead);

/* -------------------------------------------------------------------------- */

exports.api = functions.https.onRequest(app);

/* ------------------------- NOTIFICATION FUNCTIONS ------------------------- */

exports.createNotificationOnLike = functions.firestore
  .document("likes/{id}")
  .onCreate((snapshot) => {
    return db
      .doc(`/screams/${snapshot.data().screamId}`)
      .get()
      .then((doc) => {
        if (
          doc.exists &&
          doc.data().userHandle !== snapshot.data().userHandle
        ) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: "like",
            read: false,
            screamId: doc.id,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  });

exports.deleteNotificationOnUnlike = functions.firestore
  .document("likes/{id}")
  .onDelete((snapshot) => {
    return db
      .doc(`/notifications/${snapshot.id}`)
      .delete()
      .catch((err) => {
        console.error(err);
        return;
      });
  });

exports.createNotificationOnComment = functions.firestore
  .document("comments/{id}")
  .onCreate((snapshot) => {
    return db
      .doc(`/screams/${snapshot.data().screamId}`)
      .get()
      .then((doc) => {
        if (
          doc.exists &&
          doc.data().userHandle !== snapshot.data().userHandle
        ) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: "comment",
            read: false,
            screamId: doc.id,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  });

exports.onUserImageChange = functions.firestore
  .document("/users/{userId}")
  .onUpdate((change) => {
    console.table({ before: change.before.data(), after: change.after.data() });
    if (change.before.data().imageUrl !== change.after.data().imageUrl) {
      console.log("Image has changed");
      const batch = db.batch();
      return db
        .collection("screams")
        .where("userHandle", "==", change.before.data().handle)
        .get()
        .then((data) => {
          data.forEach((doc) => {
            const scream = db.doc(`/screams/${doc.id}`);
            batch.update(scream, { userImage: change.after.data().imageUrl });
          });
          return batch.commit();
        });
    } else return true;
  });

exports.onScreamDelete = functions.firestore
  .document("/screams/{screamId}")
  .onDelete((snapshot, context) => {
    const screamId = context.params.screamId;
    const batch = db.batch();
    return db
      .collection("comments")
      .where("screamId", "==", screamId)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/comments/${doc.id}`));
        });
        return db.collection("likes").where("screamId", "==", screamId).get();
      })
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/likes/${doc.id}`));
        });
        return db
          .collection("notifications")
          .where("screamId", "==", screamId)
          .get();
      })
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/notifications/${doc.id}`));
        });
        return batch.commit();
      })
      .catch((err) => {
        console.error(err);
      });
  });
