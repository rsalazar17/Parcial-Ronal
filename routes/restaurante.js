const express = require('express');
const router = express.Router();
const rutaControlador = '../controllers/restauranteController.js'; 
console.log('1. Intentando importar desde:', rutaControlador);
try {
  const controller = require(rutaControlador);
  console.log('2. Importación exitosa:', controller);
  router.get('/', controller.getAll);
  router.get('/:id', controller.getById);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.delete);
} catch (error) {
  console.error('3.  ERROR al importar:', error);
}

module.exports = router;