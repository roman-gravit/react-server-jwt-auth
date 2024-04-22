const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const userDto = require("../dtos/user-dto");

const dotenv = require("dotenv");
dotenv.config();
const HASH_SALT = process.env.HASH_SALT || 15;

class UserService {

	async RegisterUser(email, password) {
			
		const user_existence = await userModel.findOne({email});
		if(user_existence) {
			throw new Error(`user with enail: ${email} already exists`);
		}

		// for ex: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
		const activation_link = uuid.v4(); 

		const hashed_pwd = await bcrypt.hash(password, Number(HASH_SALT));
		const user = await userModel.create({
			email: email, 
			password: hashed_pwd, 
			activationLink: activation_link
		});

		await mailService.SendActivationEmail(email, 
											 `${process.env.API_URL}/api/activate/${activation_link}`);

		const user_dto = new userDto(user);
		const tokens = tokenService.GenerateTokens({...user_dto});

		tokenService.SaveToken(user_dto.id, tokens.refreshToken);

		return {
			...tokens,
			user: user_dto
		}
	}

	async ActivateUser(activation_link) {
		const user = await userModel.findOne({activationLink: activation_link});
		if(!user) {
			throw new Error(`Activation link was not found: ${activation_link}`);
		}	

		user.isActivated = true;
		await user.save();
	}


}

module.exports = new UserService();