import { useState, useEffect } from "react";
import axios from "axios";

const Map = () => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Initialize Google Map
    const initMap = () => {
      const google = window.google;
      const mapInstance = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 37.7749, lng: -122.4194 }, // Default center
        zoom: 13,
      });

      const mapMarker = new google.maps.Marker({
        map: mapInstance,
        draggable: true,
        position: { lat: 37.7749, lng: -122.4194 },
      });

      mapMarker.addListener("dragend", (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setCoordinates({ lat, lng });
      });

      setMap(mapInstance);
      setMarker(mapMarker);
    };

    if (!map && window.google) {
      initMap();
    }
  }, [map]);

  const handleAddressChange = async (e) => {
    const input = e.target.value;
    setAddress(input);

    if (input.length >= 3) {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/maps/get-suggestions?input=${input}`);
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    }
  };

  const handleSelectSuggestion = async (suggestion) => {
    setAddress(suggestion);
    setSuggestions([]);

    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/maps/get-coordinates?address=${suggestion}`);
      setCoordinates(data);
      if (map && marker) {
        const position = { lat: data.lat, lng: data.lng };
        map.setCenter(position);
        marker.setPosition(position);
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  return (
    <div>
      <h1>Select Location</h1>
      <input
        type="text"
        value={address}
        onChange={handleAddressChange}
        placeholder="Type an address"
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {suggestions.map((s, index) => (
          <li
            key={index}
            onClick={() => handleSelectSuggestion(s)}
            style={{ cursor: "pointer", padding: "5px", background: "#f0f0f0", margin: "5px 0" }}
          >
            {s}
          </li>
        ))}
      </ul>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
      <p>
        Selected Coordinates: {coordinates ? `${coordinates.lat}, ${coordinates.lng}` : "None"}
      </p>
    </div>
  );
};

export default Map;
