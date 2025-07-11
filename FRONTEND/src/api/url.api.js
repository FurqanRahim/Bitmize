import axiosInstance from "./api.instance.js";

const Post = (url) =>{
    return axiosInstance.post('/url/create',url)
}

export default Post;