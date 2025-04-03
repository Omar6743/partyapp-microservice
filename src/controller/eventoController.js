const express = require('express');
const router = express.Router();
const eventoService = require('../service/eventoService');

// Endpoint para listar todos los eventos
router.get('/eventos', async (req, res) => {
  try {
    const eventos = await eventoService.getAllEventos();
    res.status(200).json(eventos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;