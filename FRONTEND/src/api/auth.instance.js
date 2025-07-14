import axiosInstance from "./api.instance";

const registerUser = async (name, email, password) => {
    try {
        const response = await axiosInstance.post('/user/create', {name, email, password});
        
        return response;
    } catch (error) {
        // Handle error here or throw it to be handled by the calling component
        throw error;
    }
}

const loginUser = async (email, password) => {
    try {
        const response = await axiosInstance.post('/user/login', {email, password});
        console.log(response.data.message);
        return response;
    } catch (error) {
        // Handle error here or throw it
        throw error;
    }
}

const logoutUser = async (id) => {
    try {
        const response = await axiosInstance.get('/user/logout', {id});
        return response;
    } catch (error) {
        // Handle error here or throw it
        throw error;
    }
}
// /api/user/current
const getCurrentUser =async  () => { 
    try {
        const response = await axiosInstance.get('/user/current');
        console.log("RESPONSE OF GET CURRENT USER ===============================>",response)
        
        return response;
    } catch (error) {
        // Handle error here or throw it
       console.log("GET CURRENT USER ===============================================> ")
    }
}

export {registerUser, loginUser, logoutUser,getCurrentUser};