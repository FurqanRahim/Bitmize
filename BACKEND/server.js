import express from "express"
import { nanoid } from "nanoid"
import dotenv from "dotenv";
dotenv.config('./.env')
import connectionDB from "./src/config/mongodb.config.js";
import router from "./src/routes/url.routes.js";


const PORT = 5000
const app = express()




app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(router);


app.listen(PORT,()=>{
    console.log(`Backend Application is running at ${PORT}`);
    
})