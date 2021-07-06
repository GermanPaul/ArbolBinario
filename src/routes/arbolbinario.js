const express = require('express');
const Nodos = require('../helpers/nodos');

const router = express.Router();

// Modelo de cada Nodo
const Nodo = require('../models/nodo');

// Agregar un Nodo
router.post('/', async (req, res) => {
  const indice = 0;
  var { valor } = req.body;
  if (isNaN(valor)) {
    res.json({ status: 'error', mensaje: `El valor recibido no es válido.` });
  } else {
    valor = Math.floor(valor);
    if (valor < 0) { valor++ };
    const arbol = await Nodo.find();
    if (arbol[0] == null) {
      const nodo = new Nodo({ indice, valor });
      await nodo.save();
      res.json({ status: 'ok', indice, mensaje: `Nodo guardado en el índice: ${indice}.` });
    } else {
      const nodos = new Nodos(res, arbol, Nodo);
      return nodos.buscarNodo(indice, valor);
    };
  };
});

// Obtener todos los Nodos
router.get('/', async (req, res) => {
  const arbol = await Nodo.find({}, { _id: 0, __v: 0 });
  res.json(arbol);
});

// Obtener Padre Común
router.get('/:valor1/:valor2', async (req, res) => {
  var valor1 = req.params.valor1, valor2 = req.params.valor2;
  if (isNaN(valor1) | isNaN(valor2)) {
    res.json({ status: 'error', mensaje: 'Al menos uno de los valores no es válido.' });
  } else {
    valor1 = Math.floor(valor1);
    valor2 = Math.floor(valor2);
    if (valor1 < 0) { valor1++ };
    if (valor2 < 0) { valor2++ };
    const arbol = await Nodo.find();
    const nodos = new Nodos(res, arbol);
    return nodos.encontrarNodoPadre(valor1, valor2);
  };
});

// Eliminar todos los Nodos
router.delete('/', async (req, res) => {
  const arbol = await Nodo.deleteMany({});
  res.json({ status: 'ok', mensaje: 'Todos los nodos del árbol han sido eliminados.' });
});

module.exports = router;