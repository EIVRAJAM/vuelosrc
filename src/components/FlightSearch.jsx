import React, { useState, useEffect } from "react";
import flightService from "../services/flightService"; // Asegúrate de tener este servicio para obtener los vuelos
import airportService from "../services/airportService"; // Asegúrate de tener este servicio para obtener los aeropuertos
import "../styles/FlightSearch.css";

function FlightSearch() {
  const [airports, setAirports] = useState([]); // Lista de aeropuertos
  const [flights, setFlights] = useState([]); // Lista de vuelos
  const [filteredFlights, setFilteredFlights] = useState([]); // Vuelos filtrados
  const [origin, setOrigin] = useState(""); // Origen seleccionado
  const [destination, setDestination] = useState(""); // Destino seleccionado
  const [date, setDate] = useState(""); // Fecha seleccionada
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  // Obtener los aeropuertos al cargar el componente
  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await airportService.getAll();
        setAirports(response); // Asumiendo que el servicio devuelve una lista de aeropuertos
      } catch (error) {
        setError("Error al obtener los aeropuertos");
      }
    };

    fetchAirports();
  }, []);

  // Obtener los vuelos al cargar el componente
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await flightService.getAll();
        setFlights(response); // Asumiendo que el servicio devuelve todos los vuelos
      } catch (error) {
        setError("Error al obtener los vuelos");
      }
    };

    fetchFlights();
  }, []);

  // Filtrar vuelos según origen, destino y fecha
  const searchFlights = () => {
    setLoading(true);
    setError(null);
    
    // Aseguramos que `origin` y `destination` sean cadenas no vacías antes de intentar usarlas
    const originAirport = origin && origin.trim() !== ""
      ? airports.find((airport) => airport.name && airport.name.toLowerCase() === origin.toLowerCase())
      : null;
    
    const destinationAirport = destination && destination.trim() !== ""
      ? airports.find((airport) => airport.name && airport.name.toLowerCase() === destination.toLowerCase())
      : null;
    
    // Verificar si se encontraron los aeropuertos
    if (!originAirport) {
      setError("El aeropuerto de origen no se encuentra.");
      setLoading(false);
      return;
    }
  
    if (!destinationAirport) {
      setError("El aeropuerto de destino no se encuentra.");
      setLoading(false);
      return;
    }
  
    // Filtrar los vuelos que coincidan con los aeropuertos de origen y destino
    const filtered = flights.filter((flight) => {
      return (
        flight.aeropuerto_origen_id === originAirport.id &&
        flight.aeropuerto_destino_id === destinationAirport.id &&
        (date ? flight.fecha_salida === date : true)
      );
    });
  
    setFilteredFlights(filtered); // Actualizar los vuelos filtrados
    setLoading(false);
  };
  

  return (
    <div className="flight-search">
      <div className="tabs">
        <button className="active">Oneway</button>
      </div>
      <div className="form">
        {/* Inputs para origen, destino, fecha y búsqueda */}
        <input
          type="text"
          placeholder="Origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button className="search-btn" onClick={searchFlights}>
          {loading ? "Searching..." : "Search Flight"}
        </button>
      </div>

      {/* Mostrar error si hay */}
      {error && <p className="error">{error}</p>}

      {/* Mostrar los vuelos filtrados */}
      <div className="flight-list">
        {filteredFlights.length > 0 ? (
          filteredFlights.map((flight) => (
            <div key={flight.id} className="flight-card">
              <p>Aeropuerto Origen: {flight.aeropuerto_origen_id}</p>
              <p>Aeropuerto Destino: {flight.aeropuerto_destino_id}</p>
              <p>Fecha de Salida: {flight.fecha_salida}</p>
              <p>Duración: {flight.duracion}</p>
              <p>Capacidad: {flight.capacidad}</p>
              <p>Precio: {flight.precio}</p>
            </div>
          ))
        ) : (
          <p>No se encontraron vuelos para los parámetros seleccionados.</p>
        )}
      </div>
    </div>
  );
}

export default FlightSearch;
