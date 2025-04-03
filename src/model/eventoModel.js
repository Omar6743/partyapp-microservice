const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const eventoSchema = new Schema({
  id: {
    type: Number
  },
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

// Agrega el plugin para autoincrementar el campo "id"
eventoSchema.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = mongoose.model('Evento', eventoSchema);