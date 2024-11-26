import React, { useState, useEffect } from "react";
import airlineService from "../../services/airlineService";  
import airportService from "../../services/airportService";   
import flightService from "../../services/flightService";  

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [airports, setAirports] = useState([]);
  const [form, setForm] = useState({
    airline: "",
    originAirport: "",
    destinationAirport: "",
    departureDate: "",
    departureTime: "",
    duration: "",
    capacity: "",
    price: "",
    reservations: [],
  });
  const [editingFlightId, setEditingFlightId] = useState(null);

  useEffect(() => {
    // Obtener aerolíneas y aeropuertos al cargar el componente
    const fetchAirlinesAndAirports = async () => {
      try {
        const [airlinesData, airportsData] = await Promise.all([
          airlineService.getAll(),
          airportService.getAll(),
        ]);
        setAirlines(airlinesData); // Asignar las aerolíneas obtenidas
        setAirports(airportsData); // Asignar los aeropuertos obtenidos
      } catch (error) {
        console.error("Error al cargar aerolíneas y aeropuertos:", error);
      }
    };

    // Obtener todos los vuelos
    const fetchFlights = async () => {
      try {
        const flightsData = await flightService.getAll();
        console.log(flightsData);  // Verifica la estructura de los datos
        setFlights(flightsData);
      } catch (error) {
        console.error("Error al cargar vuelos:", error);
      }
    };

    fetchAirlinesAndAirports();
    fetchFlights();
  }, []);


  const handleAddOrUpdate = async () => {
    const newFlight = {
      aerolinea_id: form.airlineId,
      aeropuertoOrigen_id: form.originAirportId,
      aeropuertoDestino_id: form.destinationAirportId,
      fecha_salida: form.departureDate,
      hora_salida: form.departureTime,
      duracion: form.duration,
      capacidad: form.capacity,
      precio: form.price,
      reservas_id: form.reservations,
    };

    if (editingFlightId) {
      try {
        // Actualizar vuelo
        await flightService.update(editingFlightId, newFlight);
        const updatedFlights = flights.map((flight) =>
          flight.id === editingFlightId ? { ...flight, ...newFlight } : flight
        );
        setFlights(updatedFlights);
      } catch (error) {
        console.error("Error al actualizar el vuelo:", error);
      }
    } else {
      try {
        // Crear nuevo vuelo
        const createdFlight = await flightService.create(newFlight);
        setFlights([...flights, createdFlight]);
      } catch (error) {
        console.error("Error al agregar el vuelo:", error);
      }
    }

    // Limpiar formulario
    setForm({
      airline: "",
      originAirport: "",
      destinationAirport: "",
      departureDate: "",
      departureTime: "",
      duration: "",
      capacity: "",
      price: "",
      reservations: [],
    });
    setEditingFlightId(null);
  };

  const handleUpdate = (id) => {
    const flightToEdit = flights.find((flight) => flight.id === id);
    setForm({
      airline: airlines.find((a) => a.id === flightToEdit.aerolinea_id)?.id,
      originAirport: airports.find((a) => a.id === flightToEdit.aeropuertoOrigen_id)?.id,
      destinationAirport: airports.find((a) => a.id === flightToEdit.aeropuertoDestino_id)?.id,
      departureDate: flightToEdit.fecha_salida,
      departureTime: flightToEdit.hora_salida,
      duration: flightToEdit.duracion,
      capacity: flightToEdit.capacidad,
      price: flightToEdit.precio,
      reservations: flightToEdit.reservas_id,
    });
    setEditingFlightId(id);
  };

  const handleDelete = async (id) => {
    try {
      await flightService.delete(id);
      setFlights(flights.filter((flight) => flight.id !== id));
    } catch (error) {
      console.error("Error al eliminar el vuelo:", error);
    }
  };

  const [selectedValue1, setSelectedValue1] = useState('');
  const [selectedValue2, setSelectedValue2] = useState('');
  const [selectedValue3, setSelectedValue3] = useState('');

  const handleSelectChange1 = (event) => {
    setSelectedValue1(event.target.value);
};

const handleSelectChange2 = (event) => {
    setSelectedValue2(event.target.value);
};

const handleSelectChange3 = (event) => {
    setSelectedValue3(event.target.value);
};



  return (
    <div className="admin-panel">
      <h2>Gestión de Vuelos</h2>

      {/* Formulario para agregar o actualizar vuelos */}
      <div>
      <select
          value={form.airlineId}
          onChange={handleSelectChange1}
          required
        >
          <option value="">Seleccionar Aerolínea</option>
          {airlines.map((airline) => (
            <option key={airline.id} value={airline.id}>
              {airline.nombre}
            </option>
          ))}
        </select>
        <input
          type="text"
          readOnly
          // value={form.airlineId}
          placeholder="ID Aerolínea"
          value={selectedValue1}  
        />

        <select
          value={form.originAirportId}
          onChange={handleSelectChange2}
          required
        >
          <option value="">Aeropuerto de Origen</option>
          {airports.map((airport) => (
            <option key={airport.id} value={airport.id}>
              {airport.nombre}
            </option>
          ))}
        </select>
        <input
          type="text"
          readOnly
          // value={form.originAirportId}
          placeholder="ID Aeropuerto Origen"
          value={selectedValue2}  
        />

        <select
          value={form.destinationAirportId}
          onChange={handleSelectChange3}
          required
        >
          <option value="">Aeropuerto de Destino</option>
          {airports.map((airport) => (
            <option key={airport.id} value={airport.id}>
              {airport.nombre}
            </option>
          ))}
        </select>
        <input
          type=""
          readOnly
          // value={form.destinationAirportId}
          placeholder="ID Aeropuerto Destino"
          value={selectedValue3}  
        />

        <input
          type="date"
          value={form.departureDate}
          onChange={(e) => setForm({ ...form, departureDate: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Duración (ej. 2h 30m)"
          value={form.departureTime}
          onChange={(e) =>
            setForm({ ...form, departureTime: e.target.value })
          }
          required
        />

        <input
          type="text"
          placeholder="Duración (ej. 2h 30m)"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Capacidad"
          value={form.capacity}
          onChange={(e) => setForm({ ...form, capacity: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Precio"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />

        <button className="add" onClick={handleAddOrUpdate}>
          {editingFlightId ? "Actualizar Vuelo" : "Agregar Vuelo"}
        </button>
      </div>

      {/* Listado de vuelos */}
      <ul>
        {flights.map((flight) => (
          <li key={flight.id}>
            {/* Obtener nombres de aerolíneas y aeropuertos desde los IDs */}
            {flight.aerolinea_id && flight.aeropuertoOrigen_id && flight.aeropuertoDestino_id ? (
              <>
                Aerolínea ID: {flight.aerolinea_id} - Origen: {flight.aeropuertoOrigen_id} - Destino: {flight.aeropuertoDestino_id}<br />
                
                {/* Convertir fecha_salida en un formato legible */}
                Fecha de salida: {`${flight.fecha_salida[2]}/${flight.fecha_salida[1]}/${flight.fecha_salida[0]}`}<br />
                
                Hora de salida: {flight.hora_salida}<br />
                Duración: {flight.duracion}<br />
                Capacidad: {flight.capacidad} pasajeros<br />
                
                {/* Formatear precio */}
                Precio: ${(flight.precio / 100).toFixed(2)} (en formato de moneda)<br />
              </>
            ) : (
              <p>Datos incompletos para este vuelo.</p>
            )}
            <button className="update" onClick={() => handleUpdate(flight.id)}>
              Editar
            </button>
            <button className="delete" onClick={() => handleDelete(flight.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Flights;
