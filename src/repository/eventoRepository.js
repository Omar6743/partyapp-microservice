const Evento = require('../model/eventoModel');

module.exports = {
  findAll: async () => {
    try {
      return await Evento.find();
    } catch (error) {
      throw error;
    }
  },
  findById: async (id) => {
    try {
      return await Evento.findById(id);
    } catch (error) {
      throw error;
    }
  },
  create: async (eventoData) => {
    try {
      const evento = new Evento(eventoData);
      return await evento.save();
    } catch (error) {
      throw error;
    }
  },
  deleteById: async (id) => {
    try {
      return await Evento.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
};