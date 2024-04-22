const ApiError = require("./api-error");
const tokenService = require("../service/token-service");

module.exports = function(req, resp, next) {
	try {

		if(req.method === "OPTIONS") {
			return next();
		}

		const auth_header = req.headers["authorization"];
		if(!auth_header) {
			return next(ApiError.UnauthorizedError());
		}

		const token = auth_header.split(" ")[1];
		if(!token) {
			return next(ApiError.UnauthorizedError());
		}

		const userData = tokenService.ValidateAccessToken(token);
		if(!userData) {
			return next(ApiError.UnauthorizedError());
		}
		req.user = userData;
		next();

	} catch(e) {
		return next(ApiError.UnauthorizedError());
	}
}