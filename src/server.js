const express = require('express');
const morgan = require('morgan');
const path = require('path');

// Inicializaciones
const app = express();

// Conexión a Base de Datos
require('./database');

// Configuraciones
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/arbolbinario', require('./routes/arbolbinario'));

// Archivos Publicos
app.use(express.static(path.join(__dirname, 'public')));;

// Inicialización del servidor
app.listen(app.get('port'), () => {
  console.log(`Servidor activo en el puerto ${app.get('port')}`);
});