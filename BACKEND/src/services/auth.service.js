import User from "../models/user.model.js";
import {emailExistDAO,nameExistDAO,userCreatedDAO} from "../Dao/auth.dao.js";
import bcrypt from "bcrypt"
import {signToken} from "../utils/helper.js"
import cookiesOption from "../utils/cookiesOption.js";



const registerUserService = async (name,email,password) => {
    try{
        const email_exist = await emailExistDAO(email);
        if(email_exist){
            return email_exist
        }
        const name_exist = await nameExistDAO(name);
        if(name_exist){
            return name_exist
        }
        const user_created = await userCreatedDAO(name,email,password);
        return user_created
    
    }catch(err){    
        console.log(err)
    }


}

const loginUserService = async (email,password) => {
    try{
        const user = await User.findOne({email});
        if(!user){
            return "Invalid Credentials"
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return "Invalid Credentials"
        }
        const token = signToken({id: user._id})
        res.cookie("accessToken",userInfo.token,cookiesOption)
        return "Login Successfully"
    }catch(err){
        console.log(err)
    }
}


export {registerUserService,loginUserService};



