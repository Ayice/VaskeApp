const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RentMachineSchema = new Schema({
  machine_id: { type: Schema.Types.ObjectId, ref: 'Machine', required: true },
  renting_free: { type: Number, required: true },
});

// Navnet her i string er input i database, altså en collection
module.exports = mongoose.model('RentMachine', RentMachineSchema);
