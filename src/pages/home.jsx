import React from "react";
import FlightSearch from "../components/FlightSearch";
import TripPackage from "../components/TripPackage";
import "../App.css";
// import FlightCard from "../components/FlightCard";
//import FlightList from "../components/FlightList"
// import FlightsContainer from "../components/FlightsContainer";
function Home() {
  return (
    <div className="app">
      <div className="content">
        <FlightSearch />
        <TripPackage />
      </div>
    </div>
  );
}

export default Home;
