class UserDto {
	email;
	id;
	isActivated;
	constructor(model) {
		this.email = model.email;
		// MongoDB adds _ to the readonly property
		this.id = model._id;
		this.isActivated = model.isActivated;
	}
}

module.exports = UserDto;