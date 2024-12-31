import {getAddressCoordinate,getAutoCompleteSuggestions} from "../services/map.service.js";
import { validationResult } from "express-validator";

export const getCoordinates = async(req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  const { address } = req.query;

  try {
      const coordinates = await getAddressCoordinate(address);
      res.status(200).json(coordinates);
  } catch (error) {
    console.log("Error in getCoordinates",error);
      res.status(404).json({ message: 'Coordinates not found' });
  }
  
}


export const getSuggestions = async (req,res) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { input } = req.query;

    const suggestions = await getAutoCompleteSuggestions(input);

    res.status(200).json(suggestions);
} catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
}
}
