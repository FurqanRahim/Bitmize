import express from "express"
import { nanoid } from "nanoid"
import dotenv from "dotenv";
dotenv.config('./.env')
import connectionDB from "./src/config/mongodb.config.js";
import router from "./src/routes/url.routes.js";
import cors from "cors";


const PORT = 5000
const app = express()

app.use(cors({
  origin: true, // Reflects the request origin
  credentials: true // If you need cookies/auth
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(router);


app.listen(PORT,()=>{
    console.log(`Backend Application is running at ${PORT}`);
    
})