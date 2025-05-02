const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // 🔹 Importar CORS
const eventoController = require('./src/controller/eventoController');
const grupoMusicalController = require('./src/controller/grupoMusicalController');

const app = express();
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/PartyApp';

app.use(cors()); // 🔹 Habilitar CORS para todas las rutas
app.use(express.json());

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Conectado a MongoDB');

  // Montar controladores
  app.use('/api', eventoController); // Rutas para eventos
  app.use('/api', grupoMusicalController); // Rutas para grupos musicales

  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
})
.catch((error) => {
  console.error('Error al conectar a MongoDB:', error);
});
