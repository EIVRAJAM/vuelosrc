import apiService from "./apiService";

const BASE_URL = "/api/v1/aeropuertos"; // Cambiar el endpoint a los aeropuertos

const airportService = {
  // Obtener todos los aeropuertos
  getAll: () => apiService.get(BASE_URL),

  // Crear un nuevo aeropuerto
  create: (data) => apiService.post(BASE_URL, data),

  // Actualizar un aeropuerto
  update: (id, data) => apiService.put(`${BASE_URL}/${id}`, data),

  // Eliminar un aeropuerto
  delete: (id) => apiService.delete(`${BASE_URL}/${id}`),
};

export default airportService;
