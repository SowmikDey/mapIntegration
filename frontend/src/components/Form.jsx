import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Form = () => {
  const [location, setLocation] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [apartment, setApartment] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const navigate = useNavigate();

  const fetchSuggestions = async (input) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/maps/get-suggestions`, {
        params: { input },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSuggestions(response.data || []);
    } catch (error) {
      if (error.response?.status === 401) {
        console.error("Unauthorized. Please log in again.");
        // Optionally redirect to the login page
      } else {
        console.error("Error fetching suggestions:", error);
      }
    }
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    if (value.length >= 3) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setLocation(suggestion);
    setSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Base URL:", import.meta.env.VITE_BASE_URL); // Log the base URL for verification

    const payload = {
      location,
      houseNo,
      apartment,
      type: selectedType,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/maps/add`, payload, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        navigate("/success-page");
      } else {
        console.error("Failed to save location:", response.data);
      }
    } catch (error) {
      console.error("Error saving location:", error);
    }
  };

  return (
    <div>
      <form className="w-full mt-[50%] lg:mt-[10%] lg:ml-0" onSubmit={handleSubmit}>
        <div className="flex flex-col py-2 mx-4 lg:mx-0 lg:p-0 lg:flex-row">
          <div className="relative w-full lg:w-[300px]">
            <input
              className="appearance-none sm:bg-transparent sm:border-b sm:border-gray-500 bg-gray-200 text-gray-800 py-2 px-2 w-full focus:outline-none"
              type="text"
              placeholder="Enter Location"
              value={location}
              onChange={handleLocationChange}
            />
            {suggestions.length > 0 && (
              <ul className="absolute bg-white border border-gray-300 w-full mt-1 z-10 max-h-40 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <input
            className="sm:bg-transparent sm:border-b sm:border-gray-500 bg-gray-200 text-gray-800 py-2 px-2 w-full mt-4 lg:w-[300px] focus:outline-none"
            type="text"
            placeholder="HOUSE/FLAT/BLOCK NO."
            value={houseNo}
            onChange={(e) => setHouseNo(e.target.value)}
          />
          <input
            className="sm:bg-transparent sm:border-b sm:border-gray-500 bg-gray-200 text-gray-800 py-2 px-2 w-full mt-4 lg:w-[300px] focus:outline-none"
            type="text"
            placeholder="APARTMENT/ROAD/AREA"
            value={apartment}
            onChange={(e) => setApartment(e.target.value)}
          />
          <button
            className="flex-shrink-0 bg-red-500 hover:bg-red-700 text-sm text-white px-4 py-2 rounded mt-4 ml-1.5 font-semibold text-center"
            type="submit"
          >
            Save Location
          </button>
        </div>
        <div className="flex gap-10 mt-10 sm:ml-12">
          <i
            className={`fa-solid fa-house ${selectedType === "home" && "text-red-500"}`}
            onClick={() => setSelectedType("home")}
          ></i>
          <i
            className={`fa-solid fa-briefcase ${selectedType === "work" && "text-red-500"}`}
            onClick={() => setSelectedType("work")}
          ></i>
          <i
            className={`fa-solid fa-user-group ${selectedType === "others" && "text-red-500"}`}
            onClick={() => setSelectedType("others")}
          ></i>
          <i
            className={`fa-solid fa-location-dot ${selectedType === "default" && "text-red-500"}`}
            onClick={() => setSelectedType("default")}
          ></i>
        </div>
      </form>
    </div>
  );
};

export default Form;
