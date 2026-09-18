const express = require('express');
const router = express.Router();
const controller = require('../controllers/incidenciasControllers');

// Rutas estáticas antes de las dinámicas (:id)
router.post('/', controller.registrarIncidencia);
router.get('/', controller.listarIncidencias);
router.get('/estadisticas', controller.obtenerEstadisticas);

router.get('/:id', controller.buscarPorId);
router.put('/:id/estado', controller.cambiarEstado);
router.delete('/:id', controller.eliminarIncidencia);
router.get('/:id/clasificacion', controller.obtenerClasificacionIncidencia);

module.exports = router;