const admin = require("firebase-admin");
const config = require("../config");

const serviceAcount = require("../Firebase-Tools/bigoodee-79097-firebase-adminsdk-v2075-bcb9eaf7db.json");

const adminDb = admin.initializeApp({
  credential: admin.credential.cert(serviceAcount),
  databaseURL: config.firebaseConfig.databaseURL,
});
const db = adminDb.firestore();

module.exports = {
  adminDb,
  db,
};
