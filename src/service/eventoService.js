const eventoRepository = require('../repository/eventoRepository');

module.exports = {
  listarEventos: async () => {
    return await eventoRepository.findAll();
  },
  obtenerEventoPorId: async (eventoId) => {
    return await eventoRepository.findById(eventoId);
  },
  crearEvento: async (eventoData) => {
    try {
      const nuevoEvento = await eventoRepository.create(eventoData);
      return nuevoEvento;
    } catch (error) {
      throw new Error('Error al crear el evento: ' + error.message);
    }
  },
  actualizarEvento: async (id, eventoData) => {
    try {
      const eventoActualizado = await eventoRepository.updateById(id, eventoData);
      if (!eventoActualizado) {
        throw new Error('Evento no encontrado');
      }
      return eventoActualizado;
    } catch (error) {
      throw new Error('Error al actualizar el evento: ' + error.message);
    }
  },
  borrarEvento: async (eventoId) => {
    return await eventoRepository.deleteById(eventoId);
  }
};