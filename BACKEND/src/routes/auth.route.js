import express from "express";
import {register_user, login_user } from "../controllers/auth.controller.js";

const auth_route = express.Router();

auth_route.post('/api/user/create',register_user);
auth_route.post('/api/user/login',login_user);



export default auth_route;