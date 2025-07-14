import Url from "../models/url.model.js";

export const saveURLDAO = async (long_url, short_url, user_id) => {
    try{
        
        const urlExist = await Url.findOne({short_url});
        
        if(urlExist){
            return {message:"Short URL already exists",status:409}
        }

        const confirm_short_url = process.env.APP_URL+short_url;
        
        
        const newURL = new Url({
        original_url: long_url,
        short_url: confirm_short_url
    });     
    
    if (user_id) {
        
        newURL.user = user_id;
    }

    await newURL.save();
    
    return {message:" URL created Successfully",status:200,url:short_url}    

    }catch(err){
        console.log(err)
        

    }
};