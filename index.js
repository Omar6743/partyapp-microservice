const express = require('express');
const mongoose = require('mongoose');
const eventoController = require('./src/controller/eventoController');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB (asegúrate de que el servidor mongod esté en ejecución)
mongoose.connect('mongodb://127.0.0.1:27017/PartyApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch((error) => console.error('Error al conectar a MongoDB:', error));

// Ruta del microservicio para eventos
app.use('/api', eventoController);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});