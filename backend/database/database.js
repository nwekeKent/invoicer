const firebase = require("firebase/app");
const { getAuth } = require("firebase/auth");

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DATABASE_URL,
	projectId: process.env.FIREBASE_PROJECTID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDERID,
	appId: process.env.FIREBASE_APP_ID,
};

const myApp = firebase.initializeApp(firebaseConfig);

const db = myApp.firestore();
const auth = myApp.auth();
const clientAuth = getAuth(myApp);
module.exports = { db, auth, clientAuth };
