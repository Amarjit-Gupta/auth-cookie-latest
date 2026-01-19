import express from 'express';
import { isAuthenticated, login, logout, signup } from '../controller/authController.js';
import checkAuth from '../middleware/checkAuth.js';

const authRoute = express.Router();

authRoute.post("/signup",signup);
authRoute.post("/login",login);
authRoute.get("/isAuth",checkAuth,isAuthenticated);
authRoute.post("/logout",logout);

export default authRoute;