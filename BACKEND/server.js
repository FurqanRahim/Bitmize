import express from "express"
import { nanoid } from "nanoid"
import dotenv from "dotenv";
dotenv.config('./.env')
import connectionDB from "./src/config/mongodb.config.js";
import url_route from "./src/routes/url.routes.js";
import cors from "cors";
import auth_route from "./src/routes/auth.route.js";
import cookieParser from "cookie-parser";
import attachUser from "./src/utils/attachUser.js";


const PORT = process.env.PORT
const app = express()



// Server-side CORS setup
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Authorization'],
  methods: ['GET', 'POST', 'OPTIONS'],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Explicit OPTIONS handler
// app.options('*', cors(corsOptions));// app.options('*', cors());

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(attachUser)

app.use(url_route);
app.use(auth_route)


console.log("NICE")


app.listen(PORT,()=>{
    console.log(`Backend Application is running at ${PORT}`);
    
})