import React from "react";
import "../styles/BookingCard.css";

const BookingCard = ({ booking }) => {
  const { date, passengers, flightPrice } = booking;

  // Calcula el precio total
  const totalPrice = flightPrice * passengers.length;

  return (
    <div className="booking-details">
      <h2>Información de la Reserva</h2>

      <div className="booking-info">
        <p><strong>Fecha:</strong> {date}</p>
        <p><strong>Número de Pasajeros:</strong> {passengers.length}</p>
        <p><strong>Precio por Vuelo:</strong> ${flightPrice.toFixed(2)}</p>
        <p><strong>Precio Total:</strong> ${totalPrice.toFixed(2)}</p>
      </div>

      <div className="passenger-info">
        <h3>Información de los Pasajeros</h3>
        <ul>
          {passengers.map((passenger, index) => (
            <li key={index}>
              <p><strong>Nombre:</strong> {passenger.name}</p>
              <p><strong>Edad:</strong> {passenger.age}</p>
              <p><strong>Documento:</strong> {passenger.document}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookingCard;
