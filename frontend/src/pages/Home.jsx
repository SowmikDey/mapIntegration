import  { useEffect, useState } from 'react'
import axios from "axios";
import Modal from '../components/Modal';

const Home = () => {
  const [isLocationOn,setIsLocationOn] = useState(true);
  const [showModal,setShowModal] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showForm,setShowForm] = useState(false);
 
  useEffect(()=>{
    if(!navigator.geolocation){
      setIsLocationOn(false);
      setShowModal(true);
    }
    else{
      navigator.geolocation.getCurrentPosition(
        ()=> setIsLocationOn(true), 
        /* === if location still not found even after giving permission ==== */
        ()=>{
        setIsLocationOn(false);
        setShowModal(true);
        }
      )
    }
  },[])

  const handleManualSearch = () => {
    setShowModal(false);
    setShowForm(true);
  };

  const reverseGeocode = async () => {
    try {
      const response = await axios.post("http://localhost:8282/api/reverse-geocode", coordinates);
      setAddress(response.data.address);
    } catch (error) {
      console.error("Error in reverse geocoding:", error);
      alert("Failed to fetch address.");
    }
  };

  const fetchSuggestions = async (input) => {
    try {
      const response = await axios.get("http://localhost:8282/api/places", { params: { input } });
      setSuggestions(response.data.suggestions);
    } catch (error) {
      console.error("Error in fetching suggestions:", error);
      alert("Failed to fetch suggestions.");
    }
  };

  const handleEnableLocation = () => {
    if (navigator.geolocation) {
      // Try to get the current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Permission already granted
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lng: longitude });
          setIsLocationOn(true);
          setShowModal(false); // Close the modal
        },
        async () => {
          // Permission denied or not determined
          alert(
            "Please enable location access in your browser settings. We'll detect when it's enabled."
          );
  
          // Start polling for permission changes
          const checkPermissionInterval = setInterval(async () => {
            const permissionStatus = await navigator.permissions.query({
              name: "geolocation",
            });
  
            if (permissionStatus.state === "granted") {
              clearInterval(checkPermissionInterval); // Stop checking
              navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setCoordinates({ lat: latitude, lng: longitude });
                setIsLocationOn(true);
                setShowModal(false); // Close the modal
              });
            }
          }, 100); // Check every 0.1 second
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };
  return (
    <div>
      {/* {showForm && <Form coordinates={coordinates} setCoordinates={setCoordinates} reverseGeocode={reverseGeocode} address={address} suggestions={suggestions} fetchSuggestions={fetchSuggestions}/>} */}
      {showModal && (<Modal coordinates={coordinates} reverseGeocode={reverseGeocode} handleManualSearch={handleManualSearch} handleEnableLocation={handleEnableLocation} fetchSuggestions={fetchSuggestions}/>)}
    </div>
  )
}

export default Home
