import axios from "axios";

 const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // Its mean that now you are able to accept cookies from backend 
});



export default axiosInstance;

