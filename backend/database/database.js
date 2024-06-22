const admin = require("firebase-admin");
const firebase = require("firebase/app");
const serviceAccount = require("../config/serviceAccountKey.json");
const { getAuth } = require("firebase/auth");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DATABASE_URL,
	projectId: process.env.FIREBASE_PROJECTID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDERID,
	appId: process.env.FIREBASE_APP_ID,
};

app = firebase.initializeApp(firebaseConfig);

const db = admin.firestore();
const auth = admin.auth();
const clientAuth = getAuth(app);
module.exports = { db, auth, clientAuth };
