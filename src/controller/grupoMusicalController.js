const express = require('express');
const router = express.Router();
const grupoMusicalService = require('../service/grupoMusicalService');

// Endpoint para obtener todos los grupos musicales
router.get('/grupos', async (req, res) => {
  try {
    const grupos = await grupoMusicalService.listarGrupos();
    res.status(200).json(grupos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para obtener un grupo musical por ID
router.get('/grupos/:id', async (req, res) => {
  try {
    const grupo = await grupoMusicalService.obtenerGrupoPorId(req.params.id);
    if (grupo) {
      res.status(200).json(grupo);
    } else {
      res.status(404).json({ message: 'Grupo musical no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;