const { incidencias, nextId, normalizarTexto, obtenerClasificacion } = require('../utils/helpers');

// 2. Registrar Incidencia
const registrarIncidencia = (req, res) => {
  const { empleado, area, descripcion, prioridad } = req.body;

  // Validar campos obligatorios y cadenas vacías con trim()
  if (!empleado || !area || !descripcion || !prioridad ||
      !empleado.trim() || !area.trim() || !descripcion.trim() || !prioridad.trim()) {
    return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
  }

  const prioridadNorm = normalizarTexto(prioridad);
  if (prioridadNorm !== 'alta' && prioridadNorm !== 'media' && prioridadNorm !== 'baja') {
    return res.status(400).json({ mensaje: "Prioridad no válida. Debe ser Alta, Media o Baja" });
  }

  // Formato capitalizado para guardar
  const prioridadFormateada = prioridadNorm.charAt(0).toUpperCase() + prioridadNorm.slice(1);

  const nuevaIncidencia = {
    id: nextId(),
    empleado: empleado.trim(),
    area: area.trim(),
    descripcion: descripcion.trim(),
    prioridad: prioridadFormateada,
    estado: "Pendiente"
  };

  incidencias.push(nuevaIncidencia);
  return res.status(201).json({ mensaje: "Incidencia registrada correctamente" });
};

// 3. Listar Incidencias
const listarIncidencias = (req, res) => {
  return res.status(200).json(incidencias);
};

// 4. Buscar Incidencia por ID
const buscarPorId = (req, res) => {
  const idParam = Number(req.params.id);
  const incidencia = incidencias.find((inc) => inc.id === idParam);

  if (!incidencia) {
    return res.status(404).json({ mensaje: "Incidencia no encontrada" });
  }

  return res.status(200).json(incidencia);
};