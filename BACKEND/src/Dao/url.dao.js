import Url from "../models/url.model.js";

export const saveURLDAO = async (short_url, long_url, user_id) => {
    try{
        const newURL = new Url({
        original_url: long_url,
        short_url: short_url
    });
    
    if (user_id) {
        newURL.user = user_id;
    }

    await newURL.save();

    }catch(err){
        console.log(err)

    }
};