const express = require('express');
const router = express.Router();
const consultasController = require('../controllers/consultasController.js');

router.get('/productos-pedido/:id', consultasController.getProductosDePedido);
router.get('/mas-vendidos', consultasController.getMasVendidos);
router.get('/ventas-restaurante', consultasController.getVentasPorRestaurante);
router.get('/pedidos-fecha/:fecha', consultasController.getPedidosPorFecha);
router.get('/empleados-rol/:rol/:id_rest', consultasController.getEmpleadosPorRol);

module.exports = router;
