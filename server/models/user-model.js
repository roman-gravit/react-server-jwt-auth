const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	isActivated: {
		type: Boolean,
		default: false
	},
	activationLink : {
		type: String
	}
});

const User = model("User", UserSchema);

module.require = User;