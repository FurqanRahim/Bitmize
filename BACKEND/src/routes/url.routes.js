import express from "express";
import { saveURL,redirectURL,getAllURL } from "../controllers/url.controller.js";


const url_route = express.Router();

url_route.post('/api/urls/create',saveURL); // Save URL

url_route.get('/api/URL/:short_url',redirectURL); // Redirect to original URL

url_route.get('/api/urls/get',getAllURL); // fetch all URL related to User by using user ID 












/*

url_route.post('/api/URL/create',saveURL); // Save URL

url_route.get('/api/URL/:short_url',redirectURL); // Redirect to original URL

url_route.get('/api/URL/get',getAllURL); // fetch all URL related to User by using user ID 


*/












export default url_route;

