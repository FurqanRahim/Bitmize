import express from "express";
import { saveURL } from "../controllers/url.controller.js";
import { redirectURL } from "../controllers/url.controller.js";

const router = express.Router();

router.post('/api/create',saveURL)

router.get('/:short_url',redirectURL);

export default router;