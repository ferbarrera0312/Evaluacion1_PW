const express = require('express');
const incidenciasRoutes = require('./routes/incidencias');

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Montaje de rutas
app.use('/incidencias', incidenciasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});