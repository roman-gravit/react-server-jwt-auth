const userService = require("../service/user-service");

const dotenv = require("dotenv");
dotenv.config();
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

class UserController {

	async Registration(req, resp, next) {
		try {
			const { email, password } = req.body;
			const userData = await userService.RegisterUser( email, password);

			resp.cookie("refreshToken", userData.refreshToken, { maxAge: 30*24*60*60*1000, httpOnly: true})

			return resp.json(userData);

		} catch(e) {
			console.log(`!!! Error during user register: ${e}`);
		}
	}

	async Login(req, resp, next) {
		try {

		} catch(e) {
			
		}
	}

	async Logout(req, resp, next) {
		try {

		} catch(e) {
			
		}
	}

	async Activate(req, resp, next) {
		try {
			const link = req.params.link;
			await userService.ActivateUser(link);
			return resp.redirect(CLIENT_URL);

		} catch(e) {
			console.log(`!!! Error during user activation: ${e}`);
		}
	}


	async Refresh(req, resp, next) {
		try {

		} catch(e) {
			
		}
	}

	async GetUsers(req, resp, next) {
		try {
			resp.json("OK")
			
		} catch(e) {
			
		}
	}
}

module.exports = new UserController();