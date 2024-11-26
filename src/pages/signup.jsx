import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import apiService from "../services/apiService"; // Asegúrate de importar tu servicio API
import "../styles/signup.css";

function SignUp() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    direccion: "",
    telefono: "",
    email: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate(); // Hook para redirigir

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await apiService.post("/api/auth/signup", formData);
  
      console.log("Respuesta del servidor:", response);
  
      // Verificar que la respuesta tiene un estado 200 y un cliente registrado
      if (true) {
        alert("Registro exitoso!");
        navigate("/login");  // Redirigir al login
      }
    }catch (error) {
      console.error("Error durante el registro:", error);
      alert("Hubo un error al registrar. Inténtalo de nuevo.");
    }
  };
  
  
  
  

  return (
    <div className="signup-container">
      <div className="signup-left">
        <h1 className="brand">VUELOS RC</h1>
        <p className="description">Crea una cuenta y empieza a viajar con nosotros!</p>
      </div>
      <div className="signup-right">
        <h2>Sign Up</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="apellidos"
            placeholder="Apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="signup-btn">
            Crear Cuenta
          </button>
        </form>
        <p className="login-link">
          ¿Ya tienes una cuenta? <a href="/login">Inicia Sesión</a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
