import { registerUserService } from "../services/auth.service.js";
import cookiesOption from "../utils/cookiesOption.js";
import { signToken } from "../utils/helper.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";


const register_user = async (req, res) => {
    
    const name = req.body.name.name
    const email = req.body.name.email
    const password = req.body.name.password
    const userInfo = await registerUserService(name, email, password);
    res.status(200).json({message : userInfo.message , status:userInfo.status})
};

const login_user = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
       
        if (!user) {
            
            res.status(200).json({ message: "Invalid Credentials",status:404 })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
           
            res.status(200).json({ message: "Invalid Credentials",status:404 })
        }
        const token = signToken({id: user._id})
        res.cookie("accessToken", token, cookiesOption)
        res.status(200).json({ message: "Login Successfully",status:200 })

    } catch (err) {
        console.log("Nice")
    }



};

const logout_user = async (req, res) => {
    try {
        res.clearCookie("accessToken", cookiesOption)
        res.status(200).json({ message: "Logout Successfully" })
    } catch (err) {
        console.log(err)
    }



}

const get_current_user = async (req, res) => {
    try {
        res.status(200).json(req.user);
        
        
    } catch (error) {
        console.error("Current user error:", error);
        console.log("GET CURRENT USER ERROR")
        console.log("GET CURRENT USER FROM BACKEND")
        res.status(500).json({ message: "Internal server error" });
    }
};

export { register_user, login_user, logout_user, get_current_user };