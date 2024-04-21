const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 5000;
const db_connection_url = process.env.MONGODB_URL || "";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const start = async() => {

	try {
		await mongoose.connect(db_connection_url);
		app.listen(PORT, () => { console.log(`server listening on port:${PORT}`);})

	} catch(e) {
		console.log(`!!! error while listening on port:${PORT} error:${e}`);
	}
	
}

start();