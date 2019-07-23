const mongoose = require('mongoose');

const URI = 'mongodb://localhost/arbolbinario';
// const URI = 'mongodb+srv://germanpaul:contra123@cluster0-5omwb.mongodb.net/desastres?retryWrites=true&w=majority';

mongoose.connect(URI,{ useNewUrlParser: true })
// mongoose.connect(URI)
  .then(db => console.log('Conectado exitosamente a la Base de Datos'))
  .catch(error => console.error(error));

module.exports = mongoose;
