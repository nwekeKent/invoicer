require("dotenv").config();

const admin = require("firebase-admin");
const firebase = require("firebase/app");
const { getAuth } = require("firebase/auth");

const base64ServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!base64ServiceAccount) {
	throw new Error(
		"FIREBASE_SERVICE_ACCOUNT_KEY_BASE64 is not set in environment variables."
	);
}

// 2. Decode the Base64 string back into a JSON string
const serviceAccountJsonString = Buffer.from(
	base64ServiceAccount,
	"base64"
).toString("utf-8");

// 3. Parse the JSON string into an object
const serviceAccount = JSON.parse(serviceAccountJsonString);

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

const myApp = firebase.initializeApp(firebaseConfig);

const db = admin.firestore();
const auth = admin.auth();
const clientAuth = getAuth(myApp);
module.exports = { db, auth, clientAuth };
