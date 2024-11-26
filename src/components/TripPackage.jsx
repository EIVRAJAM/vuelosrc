import React from "react";
import "../styles/TripPackage.css";

function TripPackage() {
  const packages = [
    { destination: "Thailand", price: "$599", image: "/assets/images/Tailandia.jpeg" },
    { destination: "Greece", price: "$599", image: "/assets/images/Grecia.jpeg" },
    { destination: "Nepal", price: "$599", image: "/assets/images/Nepal.jpeg" },
    { destination: "Colombia", price: "$599", image: "/assets/images/Colombia.jpeg" },
    { destination: "USA", price: "$599", image: "/assets/images/Usa.jpg" },
    { destination: "Rusia", price: "$599", image: "/assets/images/Rusia.jpeg" }
  ];

  return (
    <div className="trip-package">
      <h2>Most visited destinations</h2>
      <div className="packages">
        {packages.map((pkg, index) => (
          <div className="card" key={index}>
            <img src={pkg.image} alt={pkg.destination} />
            <div className="info">
              <h3>{pkg.destination}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TripPackage;
