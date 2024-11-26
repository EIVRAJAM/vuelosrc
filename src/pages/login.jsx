import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import apiService from "../services/apiService";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      // Enviar la solicitud de inicio de sesión al servidor
      const response = await apiService.post("/api/auth/login", {
        username: email,
        password: password,
      });
    
      if (response) {
        const { token, username, roles } = response; // Extrae token, username y roles del servidor
    
        // Guarda los datos en el almacenamiento local
        localStorage.setItem("token", token);
        localStorage.setItem("userName", username);
        localStorage.setItem("roles", JSON.stringify(roles)); // Guarda roles como JSON para uso posterior
    
        console.log("Token recibido:", token);
        console.log("Roles:", roles);
    
        // Redirige según el rol del usuario
        if (roles.includes("ROLE_ADMIN")) {
          navigate("/admin-panel");
        } else {
          navigate("/home"); // Ruta para usuarios normales u otros roles
        }
      } else {
        throw new Error("Respuesta inesperada del servidor");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
    }
  }
    

  return (
    <div className="login-container">
      <div className="login-left">
        <h1 className="brand">VUELOS RC</h1>
        <p className="description">Bienvenido! ingresa tus datos para acceder a tu panel</p>
      </div>
      <div className="login-right">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-btn">
            Iniciar Sesión
          </button>
        </form>
        <p className="signup-link">
          ¿No tienes cuenta? <a href="/signup">Regístrate aquí</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
