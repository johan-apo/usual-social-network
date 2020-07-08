const admin = require("firebase-admin");
const serviceAccount = require("../firebase-admin-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://usual-social-network.firebaseio.com",
  storageBucket: "usual-social-network.appspot.com",
});

const db = admin.firestore();

module.exports = { admin, db };
