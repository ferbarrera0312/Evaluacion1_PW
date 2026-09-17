// Arreglo en memoria principal
const incidencias = [];
let nextId = 1;

// Normaliza texto eliminando espacios y convirtiendo a minusculas
const normalizarTexto = (texto) => {
  return typeof texto === 'string' ? texto.trim().toLowerCase() : '';
};

// Clasifica prioridad usando exclusivamente 'switch'
const obtenerClasificacion = (prioridad) => {
  const prioridadL = normalizarTexto(prioridad);
  switch (prioridadL) {
    case 'alta':
      return 'Crítica';
    case 'media':
      return 'Importante';
    case 'baja':
      return 'Normal';
    default:
      return null;
  }
};

module.exports = {
  incidencias,
  nextId: () => nextId++,
  normalizarTexto,
  obtenerClasificacion
};
