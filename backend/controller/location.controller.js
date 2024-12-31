import prisma from "../db/db.config.js"; // Import Prisma client

// Add a Location for a User
export const addLocation = async (req, res) => {
  try {
    const { type, name,email } = req.body;
   
    const user = await prisma.user.findUnique({
      where:{
        email : email
      }
    })


    if ( !type || !name) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new location for the user
    const newLocation = await prisma.location.create({
      data: {
        type,
        name,
        userId : user.id,
      },
    });

    res.status(201).json({
      message: "Location added successfully",
      location: newLocation,
    });
  } catch (error) {
    console.error("Error adding location:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get All Locations for a User
export const getUserLocations = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ error: "User ID not found" });
    }

    // Fetch all locations for the user
    const locations = await prisma.location.findMany({
      where: { userId: userId },
    });

    res.status(200).json(locations);
  } catch (error) {
    console.error("Error fetching user locations:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a Location
export const updateLocation = async (req, res) => {
  try {
    const { locationId, type, name } = req.body;

    if (!locationId || (!type && !name)) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const updatedLocation = await prisma.location.update({
      where: { id: locationId },
      data: {
        ...(type && { type }),
        ...(name && { name }),
      },
    });

    res.status(200).json({
      message: "Location updated successfully",
      location: updatedLocation,
    });
  } catch (error) {
    console.error("Error updating location:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a Location
export const deleteLocation = async (req, res) => {
  try {
    const { locationId } = req.params;

    if (!locationId) {
      return res.status(400).json({ error: "Location ID is required" });
    }

    await prisma.location.delete({
      where: { id: parseInt(locationId) },
    });

    res.status(200).json({ message: "Location deleted successfully" });
  } catch (error) {
    console.error("Error deleting location:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
