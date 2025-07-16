import axiosInstance from "./api.instance.js";

const Post = (url) => {
    return axiosInstance.post('/urls/create', url)
}

const getURLS = async () => {
    const response = await axiosInstance.get('/urls/get')
    console.log("RESPONSE OF GET  URLS ========================================>", response)
    return response;
}


const getUrlWithoutUser = async (url, slug) => {
  try {
    // Optional debug logs (remove in production)
    console.log("Request details:", { url, slug }); 

    const data = { url, slug }; // Fixed variable declaration
    const response = await axiosInstance.post('/urls/create/without/user', data);
    
    // Axios always returns response on successful requests
    return response; 

  } catch (err) {
    // Proper error propagation
    console.error("API Error:", err); 
    throw new Error(`Failed to create URL: ${err.message}`);
  }
};



export { Post, getURLS, getUrlWithoutUser };
