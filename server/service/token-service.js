
const jwt = require("jsonwebtoken");
const TokenModel = require("../models/token-model");
const dotenv = require("dotenv");
dotenv.config();

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "secret-access";
const JWT_REFRESH_SECRET = process.env.JWT_ACCESS_SECRET || "secret-refresh";

class TokenService {
	GenerateTokens(payload) {
		const access_token = jwt.sign(payload, JWT_ACCESS_SECRET, {
			expiresIn: "30m"
		});

		const refresh_token = jwt.sign(payload, JWT_REFRESH_SECRET, {
			expiresIn: "30d"
		});

		return {
			accessToken: access_token,
			refreshToken: refresh_token
		}
	}

	async SaveToken(user_id, refresh_token) {
		const tokenData = await TokenModel.findOne({user: user_id});
		if(tokenData) {
			tokenData.refreshToken = refresh_token;
			return tokenData.save();
		}

		const token = await TokenModel.create({ user: user_id, refreshToken: refresh_token});
		return token;
	}

}

module.exports = new TokenService();