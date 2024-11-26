import React, { useState, useEffect } from "react";
import airportService from "../../services/airportService";  // Importar el servicio de aeropuertos

const Airports = () => {
  const [airports, setAirports] = useState([]);
  const [form, setForm] = useState({ name: "", city: "", country: "" });
  const [editingId, setEditingId] = useState(null); // Para manejar ediciones

  // Cargar aeropuertos al inicio
  const loadAirports = async () => {
    try {
      const data = await airportService.getAll();
      // Transforma los nombres de las propiedades del backend a las que usa el frontend
      const transformedData = data.map((airport) => ({
        id: airport.id,
        name: airport.nombre, // Cambiar 'nombre' a 'name'
        city: airport.ciudad, // Cambiar 'ciudad' a 'city'
        country: airport.pais, // Cambiar 'pais' a 'country'
      }));
      setAirports(transformedData);
    } catch (error) {
      console.error("Error al cargar aeropuertos:", error);
    }
  };

  useEffect(() => {
    loadAirports();
  }, []);

  // Manejar agregar o editar aeropuerto
  const handleAdd = async () => {
    try {
      const data = {
        nombre: form.name,
        ciudad: form.city,
        pais: form.country,
      };

      if (editingId) {
        // Actualizar aeropuerto
        await airportService.update(editingId, data);
        setEditingId(null);
      } else {
        // Crear nuevo aeropuerto
        await airportService.create(data);
      }

      // Recargar aeropuertos después de agregar/editar
      loadAirports();
      setForm({ name: "", city: "", country: "" });
    } catch (error) {
      console.error("Error al agregar/editar aeropuerto:", error);
    }
  };

  // Manejar edición de un aeropuerto
  const handleEdit = (id) => {
    const airportToEdit = airports.find((airport) => airport.id === id);
    if (airportToEdit) {
      setForm({
        name: airportToEdit.name, // 'name' en lugar de 'nombre'
        city: airportToEdit.city, // 'city' en lugar de 'ciudad'
        country: airportToEdit.country, // 'country' en lugar de 'pais'
      });
      setEditingId(id);
    }
  };

  // Manejar eliminación de un aeropuerto
  const handleDelete = async (id) => {
    try {
      await airportService.delete(id);
      // Recargar aeropuertos después de eliminar
      loadAirports();
    } catch (error) {
      console.error("Error al eliminar aeropuerto:", error);
      loadAirports(); // Recargar la lista de aeropuertos en caso de error
    }
  };

  return (
    <div className="admin-panel">
      <h2>Gestión de Aeropuertos</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Nombre"
          value={form.name}
          required
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Ciudad"
          value={form.city}
          required
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />
        <input
          type="text"
          placeholder="País"
          value={form.country}
          required  
          onChange={(e) => setForm({ ...form, country: e.target.value })}
        />
        <button className="add" onClick={handleAdd}>
          {editingId ? "Actualizar" : "Agregar"}
        </button>
      </div>

      <ul className="list">
        {airports.map((airport) => (
          <li key={airport.id} className="airport-item">
            <strong>{airport.name}</strong> - {airport.city}, {airport.country}
            <button className="update" onClick={() => handleEdit(airport.id)}>
              Editar
            </button>
            <button className="delete" onClick={() => handleDelete(airport.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Airports;
