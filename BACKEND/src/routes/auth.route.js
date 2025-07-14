import express from "express";
import {register_user, login_user, logout_user, get_current_user } from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const auth_route = express.Router();

auth_route.post('/api/user/create',register_user);
auth_route.post('/api/user/login',login_user);
auth_route.get('/api/user/logout',logout_user);
auth_route.get('/api/user/current',get_current_user); // Get current user






export default auth_route;