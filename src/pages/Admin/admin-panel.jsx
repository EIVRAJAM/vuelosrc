import React, { useState } from "react";
import Airlines from "../../components/Admin/Airlines";
import Airports from "../../components/Admin/Airports";
import Flights from "../../components/Admin/Flights";
import "../../styles/admin-panel.css";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("airports");

  return (
    <div className="admin-panel">
      <h1>Panel de Administrador</h1>
      <div className="tabs">
        <button onClick={() => setActiveTab("airports")}>
          Aeropuertos
        </button>
        <button onClick={() => setActiveTab("airlines")}>
          Aerolíneas
        </button>
        <button onClick={() => setActiveTab("flights")}>
          Vuelos
        </button>
      </div>
      <div className="content">
        {activeTab === "airports" && <Airports />}
        {activeTab === "airlines" && <Airlines />}
        {activeTab === "flights" && <Flights />}
      </div>
    </div>
  );
};

export default AdminPanel;
