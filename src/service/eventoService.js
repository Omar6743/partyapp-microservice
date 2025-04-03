const eventoRepository = require('../repository/eventoRepository');

module.exports = {
  listarEventos: async () => {
    return await eventoRepository.findAll();
  },
  obtenerEventoPorId: async (eventoId) => {
    return await eventoRepository.findById(eventoId);
  },
  crearEvento: async (eventoData) => {
    return await eventoRepository.create(eventoData);
  }
};