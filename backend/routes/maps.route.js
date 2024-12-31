import express from "express";
const router = express.Router();
import { protectRoute } from '../middleware/protectRoute.js';
import {getCoordinates,getSuggestions} from '../controller/map.controller.js';
import { query } from "express-validator";

router.get('/get-coordinates',query('address').isString().isLength({ min: 3 }),protectRoute,getCoordinates);
router.get('/get-suggestions',query('input').isString().isLength({ min: 3 }),protectRoute,getSuggestions)


export default router;