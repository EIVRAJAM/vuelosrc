import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/home";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
// import Booking from "./pages/booking";
// import FlightList from "./components/FlightList";
// import FlightDetails from "./components/FlightDetails";
import AdminPanel from "./pages/Admin/admin-panel";
import Booking from "./pages/booking";
import ProtectedRoute from "./components/ProtectedRoute";
// import BookingCard from "./components/BookingCard";
// import FlightCard from "./components/FlightCard";



// Layout principal con Navbar y Sidebar
const MainLayout = ({ children }) => (
  <div className="app">
    <Navbar />
    <Sidebar />
    <div className="layout">
      <div className="main-content">{children}</div>
    </div>
  </div>
);

// Layout sin Navbar y Sidebar
const SimpleLayout = ({ children }) => <div className="simple-layout">{children}</div>;

function App() {
  return (
    <Router>
      <Routes>

        {/* Ruta predeterminada (redirección al login por ejemplo) */}
        {/* <Route
          path="/prueba"
          element={
            <MainLayout>
              <FlightCard />
            </MainLayout>
          }
        />   */}
        <Route
          path="/"
          element={
            <SimpleLayout>
              <SignUp />
            </SimpleLayout>
          }
        />
        {/* Rutas con el layout principal */}
        <Route
          path="/home"
          element={
            <ProtectedRoute roles={["ROLE_USER"]}>
              <MainLayout>
                <Home />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <SimpleLayout>
              <Login />
            </SimpleLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <SimpleLayout>
              <SignUp />
            </SimpleLayout>
          }
        />

        <Route
          path="/admin-panel"
          element={
            <ProtectedRoute roles={["ROLE_ADMIN"]}>
              <Navbar/>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking"
          element={
            <MainLayout>
              <Booking />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
