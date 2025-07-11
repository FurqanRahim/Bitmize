import express from "express";
import { saveURL } from "../controllers/url.controller.js";
import { redirectURL } from "../controllers/url.controller.js";

const url_route = express.Router();

url_route.post('/api/url/create',saveURL)

url_route.get('api/url/:short_url',redirectURL);

url_route.get('/api/:short_url',redirectURL);

export default url_route;

