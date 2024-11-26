import React from "react";
import BookingCard from "../components/BookingCard";


const bookingData = {
  date: "2024-12-01",
  flightPrice: 200, // Precio del vuelo por pasajero
  passengers: [
    { name: "Juan Pérez", age: 30, document: "12345678" },
    { name: "Ana López", age: 28, document: "87654321" },
  ],
};

const Booking = () => {
  return (
    <div>
      <h1 className="center">Mis Reservas</h1>
      <BookingCard booking={bookingData} />
      <BookingCard booking={bookingData} />
      <BookingCard booking={bookingData} />
      <BookingCard booking={bookingData} />
    </div>
  );
};

export default Booking;
