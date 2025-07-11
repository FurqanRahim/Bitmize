import User from "../models/user.model.js";
import { signToken,verifyToken } from "../utils/helper.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"




const emailExistDAO = async (email) => {
    try{
        const email_exist = await User.findOne({email});
        if(email_exist){
            return "Email Already Exist"
        }
    }catch(err){
        console.log(err)
    }
};

const nameExistDAO = async (name) => {
    try{
        const name_exist = await User.findOne({name});
        if(name_exist){
            return "User Already Exist"
        }
        
    }catch(err){
        console.log(err)
    }
};

const userCreatedDAO = async (name,email,password) => {
    try{
        const saltRounds = 10; 
        const hashpassword=await bcrypt.hash(password,saltRounds);
        const newUser = new User({
            name,
            email,
            password:hashpassword
        });
        await newUser.save();
        
        
        
        return "User created Successfully"   
        
    }catch(err){
        console.log(err)
    }
};







export {emailExistDAO,nameExistDAO,userCreatedDAO};