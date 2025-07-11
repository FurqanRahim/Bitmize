import { verifyToken } from "./helper.js";
import User from "../models/user.model.js";

const attachUser = async (req, res, next) => {
    const token = req.cookies.accessToken;
    
    
    if (!token) {
        return next();
    }
    
    const decoded = verifyToken(token);
    
    
    if (!decoded) {
        return next();
    }

    try {
        const user = await User.findById(decoded.id).exec();
       
        
        if (user) {
            req.user = user;
           
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