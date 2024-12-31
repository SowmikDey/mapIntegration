import prisma from "../db/db.config.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req,res,next) => {
  try {
    console.log("Headers:", req.headers);
    console.log("Cookies:", req.cookies);
    const token = req.cookies?.jwt || req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }
    

    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    if(!decoded){
   return res.status(401).json({error: "Unauthorized: Invalid Token"});
    }

    const user = await prisma.user.findUnique({
      where : {id: decoded.userId},
      select: {
				id: true,
				name: true,
				email: true,
				// Exclude 'password' explicitly
			},
    })

    if(!user){
   return res.status(404).json({error: "User Not Found"});
    }
   
  req.user = user;
  next();

  } catch (error) {
    console.log("Error Occured in protectedRoute",error.message);
    return res.status(500).json({error: "Internal Server Error"})
  }
}
