const firebase = require('firebase');
const config = require('../config');
const { firestore } = require('./admin-db');

const dbas = firebase.initializeApp(config.firebaseConfig);
const db = dbas.firestore()


module.exports = db;

