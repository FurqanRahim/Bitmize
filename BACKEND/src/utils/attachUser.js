import { verifyToken } from "./helper.js";
import User from "../models/user.model.js";

const attachUser = async (req, res, next) => {
    const token = req.cookies.accessToken;
    console.log("Token => ", token);
    
    if (!token) {
        return next();
    }
    
    const decoded = verifyToken(token);
    console.log("Decoded => ", decoded.id);
    
    if (!decoded) {
        return next();
    }

    try {
        const user = await User.findById(decoded.id).exec();
        console.log("User in attachUser.js file", user);
        
        if (user) {
            req.user = user;
            console.log("what sent in req.user => ", req.user);
            return next();
        } else {  
            return next();
        }      
    } catch (err) {
        console.error(err);
        return next();
    }
}

export default attachUser;