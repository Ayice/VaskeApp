const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AppartmentSchema = new Schema({
	title: { type: String, required: true },
	by: { type: Schema.Types.ObjectId, ref: 'City', required: true },
})

module.exports = mongoose.model('Appartment', AppartmentSchema)
