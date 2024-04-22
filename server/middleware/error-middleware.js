const ApiError = require("./api-error");

module.exports = function(err, req, resp, next) {
	console.log(`!!! middleware error: ${err}`);
	if(err instanceof ApiError) {
		return resp.status(err.status).json({message: err.message, errors: err.errors});
	}

	return resp.status(500).json({message: "Unexpected server error"});
}