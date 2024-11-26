import React, { useState, useEffect } from "react";
import flightService from "../services/flightService";
import FlightCard from "./FlightCard"; 

const FlightsContainer = () => {
  const [flights, setFlights] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  // Función para obtener los vuelos
  const fetchFlights = async () => {
    setLoading(true); 
    try {
      const response = await flightService.getAll(); 
      console.log("Vuelos recibidos:", response);
      
      // Transforma la respuesta antes de almacenarla en el estado
      const transformedData = response.map((flight) => ({
        id: flight.id, 
        airline: flight.aerolinea_id, 
        origin: flight.aeropuerto_origen_id, 
        destination: flight.aeropuerto_destino_id, 
        departureDate: flight.fecha_salida,
        departureTime: flight.hora_salida,
        duration: flight.duracion,
        capacity: flight.capacidad,
        price: flight.precio,
      }));

      setFlights(transformedData); 
      setLoading(false); 
    } catch (error) {
      console.error("Error al obtener vuelos:", error);
      setError("No se pudieron obtener los vuelos. Intenta más tarde."); 
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []); // Dependencias vacías significa que solo se ejecutará al montar el componente

  if (loading) return <p>Cargando vuelos...</p>; 
  if (error) return <p>{error}</p>; 

  return (
    <div>
      {flights.length === 0 ? (
        <p>No hay vuelos disponibles.</p>
      ) : (
        flights.map((flight) => (
          <FlightCard
            key={flight.id} 
            airline={`Aerolínea ${flight.aerolinea_id}`} 
            origin={`Aeropuerto ${flight.aeropuerto_origen_id}`} 
            destination={`Aeropuerto ${flight.aeropuerto_destino_id}`} 
            departureDate={flight.departureDate}
            departureTime={flight.departureTime}
            duration={flight.duration}
            capacity={flight.capacity}
            price={flight.price}
          />
        ))
      )}
    </div>
  );
};

export default FlightsContainer;
