const Evento = require('../model/eventoModel');

module.exports = {
  findAll: async () => {
    try {
      return await Evento.find();
    } catch (error) {
      throw error;
    }
  }
  // Puedes agregar otros métodos (create, update, delete) según tus necesidades.
};