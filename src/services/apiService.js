const BASE_URL = "http://localhost:9292"; // URL base del backend

const getToken = () => {
  return localStorage.getItem("token"); // Obtiene el token del almacenamiento local
};

const apiService = {
  get: async (endpoint) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
      credentials: "include", // Permite enviar cookies y credenciales
      headers: {
        "Content-Type": "application/json",
        ...(getToken() && { "Authorization": `Bearer ${getToken()}` }), // Solo añade Authorization si hay token
      },
    });

    if (!response.ok) {
      // Manejo de errores detallado
      const errorMessage = await response.text();
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }
    return response.json();
  },

  post: async (endpoint, data) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(getToken() && { "Authorization": `Bearer ${getToken()}` }),
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error ${response.status}: ${errorMessage}`);
      }

      return response.json();
    } catch (error) {
      if (error.message.includes("401")) {
        localStorage.removeItem("token"); // Elimina el token inválido
      }
      throw error;
    }
  },
  
  put: async (endpoint, data) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(getToken() && { "Authorization": `Bearer ${getToken()}` }),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }
    return response.json();
  },

  delete: async (endpoint) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(getToken() && { "Authorization": `Bearer ${getToken()}` }),
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }
    return response.json();
  },
};

export default apiService;
