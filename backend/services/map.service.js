import axios from "axios";

export const getAddressCoordinate = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
      const response = await axios.get(url);
      if (response.data.status === 'OK') {
          const location = response.data.results[ 0 ].geometry.location;
          return {
              ltd: location.lat,
              lng: location.lng
          };
      } else {
          throw new Error('Unable to fetch coordinates');
      }
  } catch (error) {
      console.error(error);
      throw error;
  }
}


export const getAutoCompleteSuggestions = async(input)=>{
  if (!input) {
    throw new Error('query is required');
}

const apiKey = process.env.GOOGLE_MAPS_API;
const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

try {
    const response = await axios.get(url);
    if (response.data.status === 'OK') {
        return response.data.predictions.map(prediction => prediction.description).filter(value => value);
    } else {
        throw new Error('Unable to fetch suggestions');
    }
} catch (err) {
    console.error(err);
    throw err;
}
}