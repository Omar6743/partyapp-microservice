const eventoRepository = require('../repository/eventoRepository');

module.exports = {
  getAllEventos: async () => {
    return await eventoRepository.findAll();
  }
};