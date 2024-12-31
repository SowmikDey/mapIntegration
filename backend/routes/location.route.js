import express from "express";
import {
  addLocation,
  getUserLocations,
  updateLocation,
  deleteLocation,
} from "../controller/location.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

// Add a new location
router.post("/add", protectRoute,addLocation);

// Get all locations for a user
router.get("/getUserLocation", protectRoute,getUserLocations);

// Update an existing location
router.put("/update", protectRoute,updateLocation);

// Delete a location
router.delete("/:locationId", protectRoute,deleteLocation);

export default router;
