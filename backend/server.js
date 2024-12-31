import express from 'express';
import env from 'dotenv';
import cors from "cors";
import cookieParser from "cookie-parser";
import mapRoute from "./routes/maps.route.js";
import authRoutes from "./routes/auth.route.js";
import locationRoutes from "./routes/location.route.js";


env.config();

const app = express();
const port = process.env.PORT || 3000;

//middlewares
app.use(cors({ origin: 'http://localhost:5173',
  credentials: true
 }));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


//Routes
app.use('/api/auth',authRoutes);
app.use("/api/maps",mapRoute);
app.use("/api/location",locationRoutes);


app.listen(port,()=>console.log(`Server is running on ${port}`)); 