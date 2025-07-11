import { verifyToken } from "./helper.js";
import User from "../models/user.model.js";


const attachUser = (req,res,next) => {
    const token = req.cookies.accessToken;
    console.log("Token => ",token)
    if(!token){
        next()
    }
    const decoded = verifyToken(token);
    console.log("Decoded => ",decoded.id)
    if(!decoded){
        next()
    }

    const user = User.findById(decoded.id);
    console.log("User in attachUser.js file",user)
    if(user){
            req.user = user;
            console.log("what sent in req.user => ",req.user)
            next();

    }else{  
        next()
    }      

}



export default attachUser;
