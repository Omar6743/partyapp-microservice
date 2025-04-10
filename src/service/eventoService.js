const eventoRepository = require('../repository/eventoRepository');
const EventoNoDisponibleException = require('../exceptions/EventoNoDisponibleException');  // Asegúrate de crear esta excepción

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
  },

  // Implementación del método para reservar un evento
  reservarEvento: async (eventoId) => {
    const evento = await eventoRepository.findById(eventoId);
    
    if (!evento) {
      throw new Error('Evento no encontrado');
    }
    
    if (evento.estado === 'reservado') {
      throw new EventoNoDisponibleException('Este evento ya está reservado');
    }

    // Cambiar el estado del evento a "reservado"
    evento.estado = 'reservado';
    return await evento.save();
  }
};
