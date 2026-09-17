// Arreglo en memoria principal
const incidencias = [];
let nextId = 1;

// Normaliza texto eliminando espacios y convirtiendo a minúsculas
const normalizarTexto = (texto) => {
  return typeof texto === 'string' ? texto.trim().toLowerCase() : '';
};
