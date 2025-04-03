const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventoSchema = new Schema({
  ubicacion: {
    type: String,
    required: true
  },
  grupo: {
    type: String,
    required: true
  },
  duracion: {
    type: Number,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  estado: {
    type: String,
    enum: ['disponible', 'reservado'],
    required: true
  }
});

// Si necesitas índices adicionales, los puedes agregar aquí
// ejemplo: eventoSchema.index({ <campo>: 1 }, { unique: true });

module.exports = mongoose.model('Evento', eventoSchema);