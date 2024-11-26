import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Recuperar el nombre del usuario desde localStorage
    const storedUserName = localStorage.getItem("userName");
    setUserName(storedUserName || "...");
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Eliminar datos del almacenamiento local
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    window.location.href = "/login"; // Redirige al login
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">VUELOS RC</div>
      <div className="navbar-user-section">
        <div className="user-info" onClick={toggleDropdown}>
          <img
            src="https://i.ibb.co/c2ZTTzW/silueta-perfil.png"
            alt="User Avatar"
            className="user-avatar"
          />
          <span className="user-name">{userName}</span>
        </div>

        {isDropdownOpen && (
          <div className="user-dropdown">
            <ul>
              <li onClick={handleLogout}>Cerrar sesión</li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
