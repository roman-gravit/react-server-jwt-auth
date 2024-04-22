const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("../server/router/router");
const errorMiddleware = require("./middleware/error-middleware");

dotenv.config();
const PORT = process.env.PORT || 5000;
const db_connection_url = process.env.MONGODB_URL || "";
const app = express();

// The express.json() function is a built-in middleware function in Express. 
// It parses incoming requests with JSON payloads and is based on body-parser. 
app.use(express.json());

app.use(cookieParser());
app.use(cors());

app.use("/api", router);

// last middleware: error handling
app.use(errorMiddleware);


const start = async() => {

	try {
		await mongoose.connect(db_connection_url);
		app.listen(PORT, () => { console.log(`server listening on port:${PORT}`);})

	} catch(e) {
		console.log(`!!! error while listening on port:${PORT} error:${e}`);
	}
	
}

start();