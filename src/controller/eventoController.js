const express = require('express');
const router = express.Router();
const eventoService = require('../service/eventoService');

// Endpoint para listar todos los eventos
router.get('/eventos', async (req, res) => {
  try {
    const eventos = await eventoService.listarEventos();
    res.status(200).json(eventos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para obtener un evento por ID
router.get('/eventos/:id', async (req, res) => {
  try {
    const evento = await eventoService.obtenerEventoPorId(req.params.id);
    if (evento) {
      res.status(200).json(evento);
    } else {
      res.status(404).json({ message: 'Evento no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Nuevo endpoint POST para agregar un evento
router.post('/eventos', async (req, res) => {
  try {
    const nuevoEvento = await eventoService.crearEvento(req.body);
    res.status(201).json(nuevoEvento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Nuevo endpoint DELETE para borrar un evento por ID
router.delete('/eventos/:id', async (req, res) => {
  try {
    const eventoBorrado = await eventoService.borrarEvento(req.params.id);
    if (eventoBorrado) {
      res.status(200).json({ message: 'Evento borrado exitosamente' });
    } else {
      res.status(404).json({ message: 'Evento no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;