import Url from "../models/url.model.js";

export const saveURLDAO = async (short_url, long_url, user_id) => {
    try{

        const urlExist = await Url.findOne({short_url});
        if(urlExist){
            return "Short URL already exists"
        }
        
        const newURL = new Url({
        original_url: long_url,
        short_url: short_url
    });
    
    if (user_id) {
        newURL.user = user_id;
    }

    await newURL.save();
    return short_url

    }catch(err){
        console.log(err)
        

    }
};