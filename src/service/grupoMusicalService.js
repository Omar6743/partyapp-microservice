const grupoMusicalRepository = require('../repository/grupoMusicalRepository');

// Servicio para listar todos los grupos musicales
const listarGrupos = async () => {
  return await grupoMusicalRepository.listarGrupos();
};

// Servicio para obtener un grupo musical por su ID
const obtenerGrupoPorId = async (id) => {
  return await grupoMusicalRepository.obtenerGrupoPorId(id);
};

module.exports = {
  listarGrupos,
  obtenerGrupoPorId
};

const GrupoMusical = require('../model/grupoMusicalModel');

module.exports = {
  listarGrupos: async () => {
    return await GrupoMusical.find();
  },

  obtenerGrupoPorId: async (id) => {
    return await GrupoMusical.findById(id);
  },

  // Método para crear un grupo musical
  crearGrupoMusical: async (grupoData) => {
    const grupo = new GrupoMusical(grupoData);
    return await grupo.save();
  }
};