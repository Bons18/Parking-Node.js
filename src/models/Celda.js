const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const celdaSchema = new mongoose.Schema({
  numeroCelda: {
    type: Number,
    unique: true,
    required: true,
  },
  estado: {
    type: String,
    enum: ['disponible', 'no disponible'],
    default: 'disponible',
  },
  placaVehiculo: {
    type: String,
    maxlength: 6,
  },
  fechaIngreso: Date,
  fechaSalida: Date,
  pin: String,
});

celdaSchema.pre('save', async function(next) {
  if (this.isNew) {
    const lastCelda = await this.constructor.findOne().sort({ numeroCelda: -1 });
    this.numeroCelda = lastCelda ? lastCelda.numeroCelda + 1 : 1;
  }
  if (this.placaVehiculo && !this.pin) {
    this.pin = await bcrypt.hash(`${this.numeroCelda}${this.placaVehiculo}`, 10);
  }
  next();
});

module.exports = mongoose.model('Celda', celdaSchema);
