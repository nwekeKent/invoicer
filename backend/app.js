require("dotenv").config();

const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const path = require("path");
const userRoutes = require("./routes/user");
const invoicesRoutes = require("./routes/invoices");
const authRoutes = require("./routes/auth");

const app = express();
app.set("view engine", "pug");
app.set("views", "views");

const allowedOrigins = [
	"https://invoicer-app-azure.vercel.app",
	"http://localhost:3000",
	"http://localhost:8000",
];

app.use(
	cors({
		origin: function (origin, callback) {
			// Allow requests with no origin, like mobile apps or curl
			if (!origin) return callback(null, true);
			if (allowedOrigins.indexOf(origin) === -1) {
				const msg = `CORS policy does not allow access from ${origin}`;
				return callback(new Error(msg), false);
			}
			return callback(null, true);
		},
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
		credentials: true, // Allow sending cookies or authorization headers
	})
);

// Handle Preflight (OPTIONS) requests for CORS
app.options("*", cors());

const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", userRoutes);
app.use(invoicesRoutes);
app.use(authRoutes);

app.get("/", (req, res) => {
	res.send("Hello, World!");
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
