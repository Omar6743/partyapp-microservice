const express = require('express');
const mongoose = require('mongoose');
const eventoController = require('./src/controller/eventoController');

const app = express();
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/PartyApp';

app.use(express.json());

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Conectado a MongoDB');

  app.use('/api', eventoController);

  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
})
.catch((error) => {
  console.error('Error al conectar a MongoDB:', error);
});
