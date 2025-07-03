import instance from "./api.instance.js";

const Post = (url) =>{
    return instance.post('/api/create',url)
}

export default Post;