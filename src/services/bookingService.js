import apiService from "./apiService";

const BASE_URL = "/api/v1/bookings"; // Cambiar el endpoint a los bookings (reservas)

const bookingService = {
  // Obtener todas las reservas
  getAll: () => apiService.get(BASE_URL),

  // Obtener una reserva por su ID
  getById: (id) => apiService.get(`${BASE_URL}/${id}`),

  // Crear una nueva reserva
  create: (data) => apiService.post(BASE_URL, data),

  // Actualizar una reserva
  update: (id, data) => apiService.put(`${BASE_URL}/${id}`, data),

  // Eliminar una reserva
  delete: (id) => apiService.delete(`${BASE_URL}/${id}`),
};

export default bookingService;
