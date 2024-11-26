import apiService from "./apiService";

const BASE_URL = "/api/v1/aerolineas";

const airlineService = {
  getAll: () => apiService.get(BASE_URL),

  create: (data) => apiService.post(BASE_URL, data),

  update: (id, data) => apiService.put(`${BASE_URL}/${id}`, data),

  delete: (id) => apiService.delete(`${BASE_URL}/${id}`),
};

export default airlineService;
