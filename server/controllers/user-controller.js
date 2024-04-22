const userService = require("../service/user-service");
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

		} catch(e) {
			
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