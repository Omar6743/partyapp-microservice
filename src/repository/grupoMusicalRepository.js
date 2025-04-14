const GrupoMusical = require('../model/grupoMusicalModel');

// Función para listar todos los grupos musicales
const listarGrupos = async () => {
  return await GrupoMusical.find();
};

// Función para encontrar un grupo musical por su ID
const obtenerGrupoPorId = async (id) => {
  return await GrupoMusical.findById(id);
};

module.exports = {
  listarGrupos,
  obtenerGrupoPorId
};