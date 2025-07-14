import axiosInstance from "./api.instance.js";

const Post = (url) =>{
    return axiosInstance.post('/urls/create',url)
}

const getURLS = async  () => {
    const response = await  axiosInstance.get('/urls/get') 
    console.log("RESPONSE OF GET  URLS ========================================>",response)
    return response;
}



export {Post,getURLS};
