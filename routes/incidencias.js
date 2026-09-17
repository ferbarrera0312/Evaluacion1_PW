const express = require('express');
const router = express.Router();
const controller = require('../controllers/incidenciasController');

// Rutas estáticas antes de las dinámicas (:id)
router.post('/', controller.registrarIncidencia);
router.get('/', controller.listarIncidencias);
router.get('/estadisticas', controller.obtenerEstadisticas);

router.get('/:id', controller.buscarPorId);
router.put('/:id/estado', controller.cambiarEstado);
router.delete('/:id', controller.eliminarIncidencia);

module.exports = router;