// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
import "../css-pages/home.css"
// import { useState } from "react";



import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Test } from "./Test";  // <-- Import the Test component

const MapUpdater = ({ location }) => {
  const map = useMap();
  if (location) {
    map.setView([location.lat, location.lng], 12);
  }
  return null;
};

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState(null);

  const handleSearch = async () => {
    if (!searchTerm) return;
    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/home?searchPlace=${searchTerm}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch location data");
      }
      const data = await response.json();
      setLocation({ lat: parseFloat(data.lat), lng: parseFloat(data.lng) });
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  return (
    <>
    <div className="home-container">
    <div className="inside-map">
    <div className="search-opt-conte">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter a location"
      />
      <button onClick={handleSearch} className="map-btn">Search</button>
    </div>
  
      {/* Map Section */}
      <div className="map-container">
    
        <MapContainer center={[28.62137, 77.2148]} zoom={5} className="map-css">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {location && <MapUpdater location={location} />}
          {location && (
            <Marker position={[location.lat, location.lng]}>
              <Popup>{searchTerm}</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
      </div>
      {/* Suggestions Section */}
      <div className="suggestions-container">
        <div className="suggestion-box-suggestion-1">
          <Test />
        </div>
        <div className="suggestion-box-suggestion-2">
          <Test />
        </div>
      </div>
    </div>

     <div className="chat-box-feild">
      <input
        type="text"
        value={searchTerm}
        className="chatbox-input"
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Ask our guide for suggestion..."
      />
      <button onClick={handleSearch} className="chatbox-btn">Search</button>
    </div>
    <div className="-about-chatparabox">
      <p className="para-chatbox">A user-friendly chat-style input placed at the bottom of the map to allow travelers to ask for destination 
      suggestions, tourist spot info, or trip guidance. This feature acts like a virtual
       travel consultant, enhancing interactivity and personalization.</p>
    </div>
    
</>
  );
};