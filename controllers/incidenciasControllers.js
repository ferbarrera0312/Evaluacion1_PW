const { incidencias, nextId, normalizarTexto, obtenerClasificacion } = require('../utils/helpers');

// 2. Registrar Incidencia
const registrarIncidencia = (req, res) => {
  const { empleado, area, descripcion, prioridad } = req.body;

  // Validar campos obligatorios y cadenas vacias con trim()
  if (!empleado || !area || !descripcion || !prioridad ||
      !empleado.trim() || !area.trim() || !descripcion.trim() || !prioridad.trim()) {
    return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
  }

  const prioridadNorm = normalizarTexto(prioridad);
  if (prioridadNorm !== 'alta' && prioridadNorm !== 'media' && prioridadNorm !== 'baja') {
    return res.status(400).json({ mensaje: "Prioridad no valida. Debe ser Alta, Media o Baja" });
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

// 5. Cambiar Estado de Incidencia (Obligatorio uso de switch)
const cambiarEstado = (req, res) => {
  const idParam = Number(req.params.id);
  const { estado } = req.body;

  if (!estado || !estado.trim()) {
    return res.status(400).json({ mensaje: "El estado es obligatorio" });
  }

  const incidencia = incidencias.find((inc) => inc.id === idParam);
  if (!incidencia) {
    return res.status(404).json({ mensaje: "Incidencia no encontrada" });
  }

  const estadoNorm = normalizarTexto(estado);
  let nuevoEstado = "";

  switch (estadoNorm) {
    case 'pendiente':
      nuevoEstado = 'Pendiente';
      break;
    case 'en proceso':
      nuevoEstado = 'En Proceso';
      break;
    case 'resuelta':
      nuevoEstado = 'Resuelta';
      break;
    case 'cancelada':
      nuevoEstado = 'Cancelada';
      break;
    default:
      return res.status(400).json({ mensaje: "Estado no valido" });
  }

  incidencia.estado = nuevoEstado;
  return res.status(200).json({ mensaje: "Estado actualizado correctamente", incidencia });
};

// 6. Eliminar Incidencia
const eliminarIncidencia = (req, res) => {
  const idParam = Number(req.params.id);
  const index = incidencias.findIndex((inc) => inc.id === idParam);

  if (index === -1) {
    return res.status(404).json({ mensaje: "Incidencia no encontrada" });
  }

  incidencias.splice(index, 1);
  return res.status(200).json({ mensaje: "Incidencia eliminada correctamente" });
};

// 7. Endpoint de Estadisticas (Sin variables manuales)
const obtenerEstadisticas = (req, res) => {
  const totalIncidencias = incidencias.length;
  const pendientes = incidencias.filter((inc) => normalizarTexto(inc.estado) === 'pendiente').length;
  const enProceso = incidencias.filter((inc) => normalizarTexto(inc.estado) === 'en proceso').length;
  const resueltas = incidencias.filter((inc) => normalizarTexto(inc.estado) === 'resuelta').length;
  const canceladas = incidencias.filter((inc) => normalizarTexto(inc.estado) === 'cancelada').length;

  return res.status(200).json({
    totalIncidencias,
    pendientes,
    enProceso,
    resueltas,
    canceladas
  });
};

// 8. Clasificacion Automatica
const obtenerClasificacionIncidencia = (req, res) => {
  const idParam = Number(req.params.id);
  const incidencia = incidencias.find((inc) => inc.id === idParam);

  if (!incidencia) {
    return res.status(404).json({ mensaje: "Incidencia no encontrada" });
  }

  const clasificacion = obtenerClasificacion(incidencia.prioridad);

  return res.status(200).json({
    id: incidencia.id,
    clasificacion
  });
};

module.exports = {
  registrarIncidencia,
  listarIncidencias,
  buscarPorId,
  cambiarEstado,
  eliminarIncidencia,
  obtenerEstadisticas,
  obtenerClasificacionIncidencia
};