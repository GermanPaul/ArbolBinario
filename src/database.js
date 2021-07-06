const mongoose = require('mongoose');

const URI = 'mongodb://localhost/arbolbinario';

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(db => console.log('Conectado exitosamente a la Base de Datos'))
  .catch(error => console.error(error));

module.exports = mongoose;
