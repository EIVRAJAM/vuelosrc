import React, { useState, useEffect } from "react";
import airlineService from "../../services/airlineService";

const Airlines = () => {
  const [airlines, setAirlines] = useState([]);
  const [form, setForm] = useState({ name: "", code: "", country: "" });
  const [editingId, setEditingId] = useState(null); // Para manejar ediciones

  // Cargar aerolíneas al inicio
  const loadAirlines = async () => {
    try {
      const data = await airlineService.getAll();
      // Transforma los nombres de las propiedades del backend a las que usa el frontend
      const transformedData = data.map((airline) => ({
        id: airline.id,
        name: airline.nombre, // Cambiar 'nombre' a 'name'
        code: airline.codigo_aerolinea, // Cambiar 'codigo_aerolinea' a 'code'
        country: airline.pais_origen, // Cambiar 'pais_origen' a 'country'
        flights: airline.vuelos, // Mantener 'vuelos' como 'flights'
      }));
      setAirlines(transformedData);
    } catch (error) {
      console.error("Error al cargar aerolíneas:", error);
    }
  };

  useEffect(() => {
    loadAirlines();
  }, []);

  const handleAdd = async () => {
    try {
      const data = {
        nombre: form.name,
        codigo_aerolinea: form.code,
        pais_origen: form.country,
        vuelos: [], // Puedes incluir o omitir este campo según la lógica
      };

      if (editingId) {
        // Actualizar aerolínea
        await airlineService.update(editingId, data);
        setEditingId(null);
      } else {
        // Crear nueva aerolínea
        await airlineService.create(data);
      }

      // Recargar aerolíneas después de agregar/editar
      loadAirlines();
      setForm({ name: "", code: "", country: "" });
    } catch (error) {
      console.error("Error al agregar/editar aerolínea:", error);
    }
  };

  const handleEdit = (id) => {
    const airlineToEdit = airlines.find((airline) => airline.id === id);
    if (airlineToEdit) {
      setForm({
        name: airlineToEdit.name, // 'name' en lugar de 'nombre'
        code: airlineToEdit.code, // 'code' en lugar de 'codigo_aerolinea'
        country: airlineToEdit.country, // 'country' en lugar de 'pais_origen'
      });
      setEditingId(id);
    }
  };

  const handleDelete = async (id) => {
    try {
      await airlineService.delete(id);
      // Recargar aerolíneas después de eliminar
      loadAirlines();
    } catch (error) {
      console.error("Error al eliminar aerolínea:", error);
      loadAirlines();
    }
  };

  return (
    <div className="admin-panel">
      <h2>Gestión de Aerolíneas</h2>
      <div>
        <input
          type="text"
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Código"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="País"
          value={form.country}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
          required
        />
        <button className="add" onClick={handleAdd}>
          {editingId ? "Actualizar" : "Agregar"}
        </button>
      </div>
      <ul className="list">
        {airlines.map((airline) => (
          <li key={airline.id} className="airport-item">
            <strong>{airline.name}</strong> - {airline.country} ({airline.code})
            <button
              className="update"
              onClick={() => handleEdit(airline.id)}
            >
              Editar
            </button>
            <button
              className="delete"
              onClick={() => handleDelete(airline.id)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Airlines;
