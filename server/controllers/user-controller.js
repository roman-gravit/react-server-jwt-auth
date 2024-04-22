const userService = require("../service/user-service");
const { validationResult } = require("express-validator");
const ApiError = require("../middleware/api-error");

const dotenv = require("dotenv");
dotenv.config();
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

class UserController {

	async Registration(req, resp, next) {
		try {

			const errors = validationResult(req);
			if(!errors.isEmpty()) {
				return next(ApiError.BadRequest("Validation error", errors));
			}

			const { email, password } = req.body;
			const userData = await userService.RegisterUser( email, password);

			resp.cookie("refreshToken", userData.refreshToken, { maxAge: 30*24*60*60*1000, httpOnly: true})

			return resp.json(userData);

		} catch(e) {
			next(e);
		}
	}

	async Login(req, resp, next) {
		try {
			const { email, password } = req.body;
			const userData = await userService.Login(email, password);

			resp.cookie("refreshToken", userData.refreshToken, { maxAge: 30*24*60*60*1000, httpOnly: true})
			return resp.json(userData);

		} catch(e) {
			next(e);
		}
	}

	async Logout(req, resp, next) {
		try {
			const { refreshToken } = req.cookies;
			const token = await userService.Logout(refreshToken);
			resp.clearCookie("refreshToken");
			resp.json(token);

		} catch(e) {
			next(e);
		}
	}

	async Activate(req, resp, next) {
		try {
			const link = req.params.link;
			await userService.ActivateUser(link);
			return resp.redirect(CLIENT_URL);

		} catch(e) {
			next(e);
		}
	}


	async Refresh(req, resp, next) {
		try {
			const { refreshToken } = req.cookies;
			const userData = await userService.Refresh(refreshToken);

			resp.cookie("refreshToken", userData.refreshToken, { maxAge: 30*24*60*60*1000, httpOnly: true})
			return resp.json(userData);
		} catch(e) {
			next(e);
		}
	}

	async GetUsers(req, resp, next) {
		try {
			const users = await userService.GetUsers();
			return resp.json(users)
			
		} catch(e) {
			next(e);
		}
	}
}

module.exports = new UserController();