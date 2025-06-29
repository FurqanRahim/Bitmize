import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config('./.env');


const connectionDB = mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});


export default connectionDB;
