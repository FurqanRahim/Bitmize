import generateShortURL from "../utils/helper.js";
import {saveURLDAO, saveURLWithoutUserDAO} from "../Dao/url.dao.js";

export async function  savedURLWithoutUser(url,slug){
    try{
        console.log("savedURLWithoutUser")
        const shortURL = slug || generateShortURL();
       
       
        const info =await  saveURLWithoutUserDAO(url,shortURL);
        
        
        return info
        

    }catch(err){
        console.log(err)
    }

}

export default async function  savedURLWithUser(url,slug,userID=null){
    try{
        const shortURL = slug || generateShortURL();
       
       
        const info =await  saveURLDAO(url,shortURL,userID);
        
        
        return info
        

    }catch(err){
        console.log(err)
    }

}