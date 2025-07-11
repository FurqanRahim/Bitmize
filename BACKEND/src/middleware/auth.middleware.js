import { verifyToken } from "../utils/helper.js";
import User from "../models/user.model.js";





const authMiddleware =async  (req,res,next) => {  
    token = req.cookies.accessToken;
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    const decoded = verifyToken(token);
    if(!decoded){
        return res.status(401).json({message:"Unauthorized"})
    }
    const user = User.findById(decoded);
    if(user){
            req.user = decoded;
            next();

    }else{
        return res.status(401).json({message:"Unauthorized"})
    }

        

}




export default authMiddleware;