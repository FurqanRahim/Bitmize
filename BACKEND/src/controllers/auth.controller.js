import { registerUserService,loginUserService } from "../services/auth.service.js";
import cookiesOption from "../utils/cookiesOption.js";

const register_user = async  (req, res) => {
    const { name, email, password } = req.body;
    const userInfo =await  registerUserService(name, email, password);
    res.cookie("accessToken",userInfo.token,cookiesOption)
    res.status(200).json(userInfo.message)
};

const login_user =async (req, res) => {
     const {email, password } = req.body;
     const info =await loginUserService(email, password);
     console.log(info)
     res.status(200).send(info)

    
};

export { register_user, login_user };