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

app.use(
	cors({
		origin: "*", // Too permissive
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		credentials: true,
	})
);

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
