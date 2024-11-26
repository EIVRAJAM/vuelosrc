import React, { useState } from "react";
import "../styles/FlightDetails.css";

const FlightDetails = () => {
  const [passengerCount, setPassengerCount] = useState(1);
  const [passengers, setPassengers] = useState([
    { nombre: "", apellido: "", telefono: "", direccion: "", email: "" },
  ]);
  const [error, setError] = useState("");

  const paymentDetails = {
    total: 470138,
    impuestos: 150338,
    subtotal: 319800,
  };

  const purchaseDetails = {
    origen: "Santa Marta",
    destino: "Cartagena de Indias",
    fecha: "09 ene. 2025",
    aerolinea: "LATAM Airlines Group",
    escalas: 1,
    duracion: "1 hora",
  };

  const handleIncrement = () => {
    setPassengerCount((prevCount) => prevCount + 1);
    setPassengers([
      ...passengers,
      { nombre: "", apellido: "", telefono: "", direccion: "", email: "" },
    ]);
  };

  const handleDecrement = () => {
    if (passengerCount > 1) {
      setPassengerCount((prevCount) => prevCount - 1);
      setPassengers(passengers.slice(0, -1));
    }
  };

  const isDuplicatePassenger = (index, field, value) => {
    if (field === "nombre" || field === "apellido") {
      const updatedPassenger = { 
        ...passengers[index], 
        [field]: value.toLowerCase() 
      };
  
      return passengers.some((passenger, i) =>
        i !== index &&
        passenger.nombre.toLowerCase() === updatedPassenger.nombre &&
        passenger.apellido.toLowerCase() === updatedPassenger.apellido
      );
    }
    return false;
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Normalizar los nombres y apellidos a minúsculas para comparar correctamente
    const normalizedPassengers = passengers.map((passenger) => ({
      nombre: passenger.nombre.toLowerCase(),
      apellido: passenger.apellido.toLowerCase(),
    }));
  
    // Verifica si hay duplicados antes de enviar
    const duplicates = normalizedPassengers.some((passenger, index) =>
      normalizedPassengers.some(
        (p, i) =>
          i !== index &&
          p.nombre === passenger.nombre &&
          p.apellido === passenger.apellido
      )
    );
  
    // Si hay duplicados, muestra el error y no permite enviar
    if (duplicates) {
      setError(
        "No se puede realizar la reserva. Hay pasajeros con el mismo nombre y apellido. Por favor, corrige los datos."
      );
      return;
    }
  
    // Si no hay errores, procesa la reserva
    setError(""); // Limpia errores
    console.log("Datos de los pasajeros:", passengers);
    console.log("Detalles del pago:", paymentDetails);
    console.log("Detalles de la compra:", purchaseDetails);
    alert("¡Reserva completada!");
  };
  
  const handleInputChange = (index, field, value) => {
    if (isDuplicatePassenger(index, field, value)) {
      setError(
        "El nombre y apellido ya están registrados para otro pasajero. Por favor verifica."
      );
      return;
    }
    setError(""); // Limpia el error si no hay duplicados
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
  };
  


  return (
    <div className="flight-booking-details">
      <h2>¡Falta poco! Completa tus datos y finaliza tu compra</h2>
      <div className="container">
        <div className="form-section">
          <h3>¿Quiénes viajan?</h3>
          <div className="passenger-counter">
            <button onClick={handleDecrement} disabled={passengerCount === 1}>
              -
            </button>
            <span>
              {passengerCount} {passengerCount === 1 ? "Pasajero" : "Pasajeros"}
            </span>
            <button onClick={handleIncrement}>+</button>
          </div>

          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSubmit}>
            {passengers.map((passenger, index) => (
              <div key={index} className="passenger-form">
                <h4>Pasajero {index + 1}</h4>
                <label>
                  Nombre:
                  <input
                    type="text"
                    value={passenger.nombre}
                    onChange={(e) =>
                      handleInputChange(index, "nombre", e.target.value)
                    }
                    required
                  />
                </label>
                <label>
                  Apellido:
                  <input
                    type="text"
                    value={passenger.apellido}
                    onChange={(e) =>
                      handleInputChange(index, "apellido", e.target.value)
                    }
                    required
                  />
                </label>
                <label>
                  Teléfono:
                  <input
                    type="tel"
                    value={passenger.telefono}
                    onChange={(e) =>
                      handleInputChange(index, "telefono", e.target.value)
                    }
                    required
                  />
                </label>
                <label>
                  Dirección:
                  <input
                    type="text"
                    value={passenger.direccion}
                    onChange={(e) =>
                      handleInputChange(index, "direccion", e.target.value)
                    }
                    required
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="email"
                    value={passenger.email}
                    onChange={(e) =>
                      handleInputChange(index, "email", e.target.value)
                    }
                    required
                  />
                </label>
              </div>
            ))}

            <button type="submit" className="submit-btn" disabled={error}>
            Confirmar Reserva
            </button>

          </form>
        </div>

        <div className="details-section">
          <div className="payment-details">
            <h3>Detalle del pago</h3>
            <p>
              Vuelo para {passengerCount}{" "}
              {passengerCount === 1 ? "persona" : "personas"}: $
              {paymentDetails.subtotal.toLocaleString()}
            </p>
            <p>
              Impuestos, tasas y cargos: $
              {paymentDetails.impuestos.toLocaleString()}
            </p>
            <h4>Total: ${paymentDetails.total.toLocaleString()}</h4>
          </div>

          <div className="purchase-details">
            <h3>Detalle de la compra</h3>
            <p>
              <strong>Origen:</strong> {purchaseDetails.origen}
            </p>
            <p>
              <strong>Destino:</strong> {purchaseDetails.destino}
            </p>
            <p>
              <strong>Fecha:</strong> {purchaseDetails.fecha}
            </p>
            <p>
              <strong>Aerolínea:</strong> {purchaseDetails.aerolinea}
            </p>
            <p>
              <strong>Escalas:</strong> {purchaseDetails.escalas}
            </p>
            <p>
              <strong>Duración:</strong> {purchaseDetails.duracion}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;
