import { registerUserService,loginUserService } from "../services/auth.service.js";
import cookiesOption from "../utils/cookiesOption.js";


const register_user = async  (req, res) => {
    const { name, email, password } = req.body;
    const userInfo =await  registerUserService(name, email, password);
    res.status(200).json(userInfo.message)
};

const login_user =async (req, res) => {
    try{
             const {email, password } = req.body;
             const token =await loginUserService(email, password);
             res.cookie("accessToken",token,cookiesOption)
             res.status(200).json({message:"Login Successfully"})

    }catch(err){
        console.log(err)
    }


    
};

export { register_user, login_user };