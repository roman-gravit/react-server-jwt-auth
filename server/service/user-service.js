const userModel = require("../models/user-model");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const userDto = require("../dtos/user-dto");
const UserDto = require("../dtos/user-dto");

dotenv.config();
const HASH_SALT = process.env.HASH_SALT || "qwerty";

class UserService {

		async RegisterUser(email, password) {
			const user_existence = await userModel.findOne({email});
			if(user_existence) {
				throw new Error(`user with enail: ${email} already exists`);
			}

			// for ex: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
			const activation_link = uuid.v4(); 

			const hashed_pwd = await bcrypt.hash(password, HASH_SALT);
			const user = await userModel.create({
				email: enail, 
				password: hashed_pwd, 
				activationLink: activation_link
			});

			await mailService.SendActivationEmail(email, activation_link);

			const user_dto = new UserDto(user);
			const tokens = tokenService.GenerateTokens({...user_dto});

			tokenService.SaveToken(user_dto.id, tokens.refreshToken);

			return {
				...tokens,
				user: user_dto
			}
		}

}

module.exports = new UserService();