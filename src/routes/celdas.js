const express = require('express');
const {
  createCelda, getCelda, getCeldas, getCeldasPorEstado,
  updateCelda, deleteCelda, parquearVehiculo, calcularValorPagar, salirVehiculo
} = require('../controllers/celdasController');

const router = express.Router();

router.post('/celdas', createCelda);
router.get('/celdas/:id', getCelda);
router.get('/celdas', getCeldas);
router.get('/celdas/estado/:estado', getCeldasPorEstado);
router.put('/celdas/:id', updateCelda);
router.delete('/celdas/:id', deleteCelda);
router.post('/celdas/parquear', parquearVehiculo);
router.get('/celdas/:id/pagar', calcularValorPagar);
router.post('/celdas/:id/salir', salirVehiculo);

module.exports = router;
