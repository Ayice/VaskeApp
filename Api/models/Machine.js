const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MachineSchema = new Schema({
	title: { type: String, min: 5, required: true },
	lejlighed: { type: Schema.Types.ObjectId, ref: 'Appartment', required: true },
	tid_tilbage: { type: Number, default: 0 },
	optaget: { type: Boolean, default: false },
})

// Navnet her i string er input i database, altså en collection
module.exports = mongoose.model('Machine', MachineSchema)
