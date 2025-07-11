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
  // Basic validation before JWT verification
  if (!token || typeof token !== 'string') {
    console.error("Invalid token format");
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Validate required token fields
    if (!decoded?.id || !decoded?.iat) {
      console.error("Token missing required fields");
      return null;
    }
    
    return decoded;
  } catch (err) {
    // Specific error handling
    if (err.name === 'TokenExpiredError') {
      console.error("Token expired:", err.expiredAt);
    } else if (err.name === 'JsonWebTokenError') {
      console.error("Malformed token:", err.message);
    } else {
      console.error("Token verification error:", err.message);
    }
    return null;
  }
};

export {verifyToken,signToken};
