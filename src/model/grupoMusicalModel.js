const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Esquema para Grupo Musical
const GrupoMusicalSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  costoPorHora: {
    type: Number,
    required: true
  },
  disponibilidad: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true // Agrega campos createdAt y updatedAt
});

// Exportar el modelo de Grupo Musical
module.exports = mongoose.model('GrupoMusical', GrupoMusicalSchema);