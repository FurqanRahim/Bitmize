import { nanoid } from "nanoid";
import cookiesOption from "./cookiesOption.js";
import jwt from "jsonwebtoken";

export default function generateShortURL(){
    return nanoid(7);
}


const signToken = (payload) => {
    try{
    console.log(payload)
    console.log(process.env.JWT_SECRET)
    console.log(cookiesOption)
    const token = jwt.sign(payload, process.env.JWT_SECRET,{ expiresIn: process.env.JWT_OPTIONS });
    return token;

    }catch(err){
        console.error("Error while generating JWT token",err.message);
    }
}

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    console.error("Invalid token:", err.message);
    return null;
  }
};

export {verifyToken,signToken};
