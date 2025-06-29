import express from "express"
import { nanoid } from "nanoid"
import dotenv from "dotenv";
dotenv.config('./.env')
import connectionDB from "./src/config/mongodb.config.js";


const PORT = 5000
const app = express()




app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.post('/api/create',(req,res)=>{
    const {url}=req.body
    const shortURL = nanoid()
    res.send('Great')
})


app.listen(PORT,()=>{
    console.log(`Backend Application is running at ${PORT}`);
    
})