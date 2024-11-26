import React from "react";
import "../styles/FlightCard.css";

const FlightCard = ({ 
  airline, 
  origin, 
  destination, 
  departureDate, 
  departureTime, 
  duration, 
  capacity, 
  price, 
}) => {
  console.log("FlightCard props:", { airline, origin, destination, departureDate, departureTime, duration, capacity, price});

  return (
    
    <div className="flight-card">
      <div className="flight-info">
        {/* Logo de la aerolínea
        <img src={logo} alt={`${airline} Logo`} className="airline-logo" /> */}

        {/* Información de vuelo */}
        <div className="flight-details">
          <p>
            <strong>Origen:</strong> {origin} <br />
            <strong>Destino:</strong> {destination} <br />
            <strong>Fecha:</strong> {departureDate} <br />
            <strong>Hora:</strong> {departureTime}
          </p>
        </div>

        {/* Duración */}
        <div className="flight-duration">
          <p>
            <strong>Duración:</strong> {duration}
          </p>
        </div>
      </div>

      {/* Capacidad y Precio */}
      <div className="flight-price">
        <p>
          <strong>Capacidad:</strong> {capacity} pasajeros
        </p>
        <p>
          Desde <strong>${price ? price.toFixed(2) : "N/A"}</strong>
        </p>
      </div>
    </div>
  );
};

export default FlightCard;
