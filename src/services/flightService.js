import apiService from "./apiService";

const BASE_URL = "/api/v1/vuelos"; // Cambiar el endpoint a los vuelos

const flightService = {
  // Obtener todos los vuelos
  getAll: () => apiService.get(BASE_URL),

  // Crear un nuevo vuelo
  create: (data) => apiService.post(BASE_URL, data),

  // Actualizar un vuelo
  update: (id, data) => apiService.put(`${BASE_URL}/${id}`, data),

  // Eliminar un vuelo
  delete: (id) => apiService.delete(`${BASE_URL}/${id}`),
};

export default flightService;
