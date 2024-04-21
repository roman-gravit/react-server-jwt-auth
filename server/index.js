const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

const start = async() => {

	try {
		app.listen(PORT, () => { console.log(`server listening on port:${PORT}`);})

	} catch(e) {
		console.log(`!!! error while listening on port:${PORT} error:${e}`);
	}
	
}

start();