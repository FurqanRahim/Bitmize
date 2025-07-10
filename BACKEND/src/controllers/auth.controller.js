import { registerUserService,loginUserService } from "../services/auth.service.js";


const register_user = async  (req, res) => {
    const { name, email, password } = req.body;
    const userInfo =await  registerUserService(name, email, password);
    res.status(200).json(userInfo.message)
};

const login_user =async (req, res) => {
     const {email, password } = req.body;
     const info =await loginUserService(email, password);
     console.log(info)


    
};

export { register_user, login_user };