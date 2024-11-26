import React from "react";
import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <div className="Sidebar">
      <div className="Sidebar-content">
        <a href="/home"><div className="Sidebar-item">HOME</div></a>
        <a href="/booking"><div className="Sidebar-item">BOOKING</div></a>
      </div>
    </div>
   );
}

export default Sidebar;
