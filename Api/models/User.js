const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
	fname: {
		type: String,
		required: true,
		min: 2,
		max: 50,
	},

	lname: {
		type: String,
		required: false,
		min: 2,
		max: 50,
	},

	email: {
		type: String,
		required: true,
	},

	username: {
		type: String,
		required: true,
		index: { unique: true },
		min: 2,
		max: 50,
	},

	password: {
		type: String,
		required: true,
		min: 6,
	},

	floor: {
		type: String,
	},

	lejlighed: {
		type: Schema.Types.ObjectId,
		ref: 'Appartment',
		required: true,
	},
})

module.exports = mongoose.model('User', UserSchema)
