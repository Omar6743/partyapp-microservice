const eventoRepository = require('../repository/eventoRepository');
const EventoNoDisponibleException = require('../EventoNoDisponible/EventoNoDisponibleException');  // Asegúrate de crear esta excepción
const grupoMusicalService = require('./grupoMusicalService');

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
  },

  // Implementación del método para asignar un grupo musical a un evento
  asignarGrupo: async (eventoId, grupoId) => {
    // Obtén el grupo musical por ID y verifica su disponibilidad
    const grupo = await grupoMusicalService.obtenerGrupoPorId(grupoId);
    if (!grupo || !grupo.disponibilidad) {
      throw new Error('El grupo musical no está disponible o no existe.');
    }

    // Busca el evento por ID
    const evento = await eventoRepository.findById(eventoId);
    if (!evento) {
      throw new Error('El evento no existe.');
    }

    // Asigna el ID del grupo al evento
    evento.grupo = grupoId;
    return await evento.save();
  },

  // Implementación del método para calcular el precio dinámico del evento
  calcularPrecioEvento: async (eventoId, factorDemanda) => {
    const evento = await eventoRepository.findById(eventoId).populate('grupo'); // Asegúrate de que el esquema de Evento tiene el campo `grupo` como referencia a la colección de grupos musicales
    if (!evento || !evento.grupo) {
      throw new Error('El evento no tiene un grupo asignado.');
    }

    const costoPorHora = evento.grupo.costoPorHora;
    const precio = (evento.duracion / 60) * costoPorHora + factorDemanda;
    evento.precio = precio;
    await evento.save();
    return evento;
  }
};