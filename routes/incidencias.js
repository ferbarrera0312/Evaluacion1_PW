const express = require('express');
const router = express.Router();
const controller = require('../controllers/incidenciasController');

// Rutas estáticas antes de las dinámicas (:id)
router.post('/', controller.registrarIncidencia);
router.get('/', controller.listarIncidencias);

module.exports = router;