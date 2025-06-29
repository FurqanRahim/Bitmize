import express from "express"

const PORT = 5000
const app = express()


app.get('/',(req,res)=>{
    res.send('Great')
})


app.listen(PORT,()=>{
    console.log(`Backend Application is running at ${PORT}`);
    
})