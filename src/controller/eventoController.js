const express = require('express');
const router = express.Router();
const eventoService = require('../service/eventoService');
const grupoMusicalService = require('../service/grupoMusicalService');
const EventoNoDisponibleException = require('../EventoNoDisponible/EventoNoDisponibleException');

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

// Endpoint para actualizar un evento por ID
router.put('/eventos/:id', async (req, res) => {
  try {
    const eventoActualizado = await eventoService.actualizarEvento(req.params.id, req.body);
    if (eventoActualizado) {
      res.status(200).json(eventoActualizado);
    } else {
      res.status(404).json({ message: 'Evento no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/eventos/:id/reservar', async (req, res) => {
  try {
    const eventoReservado = await eventoService.reservarEvento(req.params.id);
    res.status(200).json(eventoReservado);
  } catch (error) {
    if (error instanceof EventoNoDisponibleException) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// Endpoint para asignar un grupo musical a un evento
router.post('/eventos/:id/asignarGrupo/:grupoId', async (req, res) => {
  try {
    const evento = await eventoService.asignarGrupo(req.params.id, req.params.grupoId);
    res.status(200).json(evento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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

// Endpoint para crear un nuevo grupo musical
router.post('/grupos', async (req, res) => {
  try {
    const { nombre, costoPorHora, disponibilidad } = req.body;

    // Asegúrate de que los datos necesarios están presentes
    if (!nombre || !costoPorHora || disponibilidad === undefined) {
      return res.status(400).json({ error: 'Los campos nombre, costoPorHora y disponibilidad son obligatorios.' });
    }

    // Crear el grupo musical utilizando el servicio
    const nuevoGrupo = await grupoMusicalService.crearGrupoMusical({ nombre, costoPorHora, disponibilidad });
    res.status(201).json(nuevoGrupo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;